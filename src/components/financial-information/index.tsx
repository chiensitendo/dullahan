import React, { memo } from "react";
import {
  DebtType,
  ExpenseData,
  FormState,
  FormStateItem,
  IncomeData,
  ValidationItem,
  addCurrentBalance,
  addDebt,
  addExpense,
  addFixedIncome,
  addNonExpense,
  addPassiveIncome,
  closeDebt,
  closeErrorMessage,
  closeExpenseDelete,
  closeIncomeDelete,
  deleteDebts,
  deleteExpense,
  deleteIncome,
  openDebt,
  openExpenseDelete,
  openIncomeDelete,
  openModal,
  removeCurrentBalance,
  selectAllExpense,
  selectAllIncome,
  sendForm,
  submitForm,
  updateCurrentBalance,
  updateDebt,
  updateDebtDelete,
  updateExpenseDelete,
  updateField,
  updateIncomeDelete,
} from "@/redux/formSlice";
import { Choice, ExpenseType, FORM_FIELD, IncomeType, VALIDATION_TYPE } from "@/type";
import {
  EXPENSE_MAX_ITEMS,
  INCOME_MAX_ITEMS,
  MULTIPLES_ESSENTIAL_EXPENSES_FIELDS,
  MULTIPLES_FIXED_INCOME_FIELDS,
  MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS,
  MULTIPLES_PASSIVE_INCOME_FIELDS,
  getValidationMessage,
} from "@/type/const";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  AnyAction,
} from "@reduxjs/toolkit";
import {
  Checkbox,
  InlineNotification,
  PrimaryButton,
  TextInput,
} from "carbon-components-react";
import { ChangeEventHandler, Dispatch, useMemo } from "react";
import { useDispatch } from "react-redux";
import { TrashCan, Close, ArrowRight } from "@carbon/icons-react";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import { SECTION_TABS, setActiveTab } from "@/redux/tabSlice";
import { AuthData } from "../use-auth";

const debtLabel = {
  name: "Name",
  annual: "Annual interest (%)",
  amount: "Remaining amount (USD)",
  payment: "Monthly payment (USD)",
};

const debtFields: DebtType[] = ["name", "annual", "amount", "payment"];

const InputField = (props: InputFieldProps) => {
  const {
    label,
    placeholder,
    isValid,
    name,
    removeBorderBottom,
    invalidType,
    inputName,
    defaultValue,
    isFirst,
    isDeleteMode,
    inputClassName,
    onChange,
  } = props;
  return (
    <div>
      {!isDeleteMode && (
        <TextInput
          id={name}
          defaultValue={defaultValue + ""}
          name={inputName}
          invalidText={
            isValid ? undefined : getValidationMessage(invalidType, name)
          }
          labelText={label}
          onChange={onChange}
          placeholder={placeholder}
          disabled={isDeleteMode}
          invalid={!isValid && !isFirst}
          className={inputClassName}
          style={{ borderBottom: removeBorderBottom ? "none" : undefined }}
        />
      )}
      {isDeleteMode && (
        <div className="flex h-full flex-col">
          {label && (
            <div className="cds--text-input__label-wrapper">
              <label className="cds--label">{label}</label>
            </div>
          )}
          <div className="delete-input-item h-full cds--text-input__label-wrapper">
            {defaultValue}
          </div>
        </div>
      )}
    </div>
  );
};

const FinancialInformationFieldGroup = (props: FieldGroupProps) => {
  const {
    title,
    items,
    name,
    dispatch,
    add,
    updateField,
    addMultipleItems,
    max,
    isBorderBottom,
    isDeleteMode,
    updateDelete,
    selectAll,
    isAll,
    isIndeterminate,
    isAdvanceAction,
    selections,
    type
  } = props;

  const components = useMemo(() => {
    let list: any[] = [];
    items.data.forEach((d, index) => {
      let inputFields = items.props.map((prop, ind) => {
        const isAllValid = Object.keys(d.validation).reduce(
          (accumulator, currentValue) =>
            accumulator &&
            ((d.validation as any)[currentValue]["isValid"] ||
              (d.validation as any)[currentValue]["isFirst"]),
          true
        );
        const removeBorderBottom = index <= items.data.length - 2 && isAllValid;
        const fieldValue = (d as any)[prop.name];
        return (
          <InputField
            key={index + "-" + ind}
            placeholder={prop.placeholder}
            label={index === 0 ? prop.label : ""}
            name={prop.name}
            inputName={`${name}[${index}].${prop.name}`}
            removeBorderBottom={removeBorderBottom}
            defaultValue={fieldValue}
            isFirst={((d.validation as any)[prop.name] as any)["isFirst"]}
            isValid={((d.validation as any)[prop.name] as any)["isValid"]}
            invalidType={((d.validation as any)[prop.name] as any)["type"]}
            isDeleteMode={isDeleteMode}
            index={index}
            onChange={(e) => {
              dispatch(
                updateField({
                  name: name,
                  index: index,
                  value: e.target.value,
                  attribute: prop.name,
                })
              );
            }}
          />
        );
      });
      if (isDeleteMode) {
        list.push([
          [
            <div
              key={list.length}
              className={classNames(
                "financial-information-field-delete-checkbox-group",
                {
                  "final-checkbox":
                    isDeleteMode &&
                    index > 0 &&
                    index === items.data.length - 1,
                }
              )}
            >
              {index === 0 && (
                <div className="check-all w-full">
                  <Checkbox
                    labelText=""
                    id={`"checked-${name}-all"`}
                    onChange={(
                      _: React.ChangeEvent<HTMLInputElement>,
                      data: {
                        checked: boolean;
                        id: string;
                      }
                    ) => {
                      selectAll &&
                        dispatch(
                          selectAll({
                            name: name,
                            isAll: data.checked,
                          })
                        );
                    }}
                    indeterminate={isIndeterminate}
                    checked={isAll}
                  />
                </div>
              )}
              <Checkbox
                labelText=""
                id={"checked-" + name + index}
                onChange={(
                  _: React.ChangeEvent<HTMLInputElement>,
                  data: {
                    checked: boolean;
                    id: string;
                  }
                ) => {
                  updateDelete &&
                    dispatch(
                      updateDelete({
                        index: index,
                        name: name,
                        checked: data.checked,
                      })
                    );
                }}
                checked={d.isDelete}
              />
            </div>,
          ],
          ...inputFields,
        ]);
      } else {
        list.push(inputFields);
      }
    });
    return list;
  }, [items, isDeleteMode, isAll, isIndeterminate]);
  const borderClass = useMemo(() => {
    if (isBorderBottom) {
      return " border-subtitle-00 pb-6";
    }
    return "";
  }, [isBorderBottom]);
  return (
    <div className={"mt-4" + borderClass}>
      <p className="heading-01" style={{ fontWeight: 600 }}>
        {title}
      </p>
      <div
        className={classNames(
          "financial-information-field-group-input-wrapper",
          {
            "is-delete-mode": isDeleteMode,
            "is-view-mode": !isDeleteMode,
          }
        )}
      >
        {components}
      </div>
      {!isDeleteMode && (
        <div className="flex p-4 items-center">
          <p
            className="text-focus body-compact-01 pr-4 cursor-pointer"
            onClick={() => dispatch(add())}
          >
            Add
          </p>
          {isAdvanceAction && (
            <p
              className="text-focus body-compact-01 pr-4 cursor-pointer"
              onClick={() =>
                dispatch(
                  addMultipleItems({
                    name: name,
                    max: max,
                    selections: selections,
                    type: type
                  })
                )
              }
            >
              Add multiple
              <span className="pl-2">+</span>
            </p>
          )}
          <p
            className="text-helper helper-text-01"
            style={{ lineHeight: "17px" }}
          >
            ({max - items.data.length}/{max} fields left)
          </p>
        </div>
      )}
    </div>
  );
};

interface FieldGroupProps {
  title: string;
  name: string;
  items: FieldGroupItem;
  add: ActionCreatorWithoutPayload<any>;
  updateField: ActionCreatorWithPayload<FormStateItem, any>;
  addMultipleItems: ActionCreatorWithPayload<
    {
      name: string;
      max: number;
      selections: Choice[];
      type: string;
    },
    any
  >;
  dispatch: Dispatch<AnyAction>;
  max: number;
  isBorderBottom?: boolean;
  isDeleteMode: boolean;
  updateDelete?: ActionCreatorWithPayload<
    {
      index: number;
      name: string;
      checked: boolean;
    },
    any
  >;
  selectAll?: ActionCreatorWithPayload<
    {
      isAll: boolean;
      name: string;
    },
    any
  >;
  isAll: boolean;
  isIndeterminate: boolean;
  isAdvanceAction: boolean;
  selections: Choice[];
  type: string;
}

interface FieldGroupItem {
  data: (IncomeData | ExpenseData)[];
  props: InputFieldProps[];
}

interface InputFieldProps {
  label: string;
  placeholder?: string;
  name: string;
  inputName?: string;
  removeBorderBottom?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  isValid?: boolean;
  isFirst?: boolean;
  invalidType?: VALIDATION_TYPE;
  defaultValue?: string;
  isDeleteMode?: boolean;
  index?: number;
  inputClassName?: string;
}

const FinancialInformation = memo(
  ({
    form,
    isAdvanceAction,
    auth,
    loading
  }: {
    form: FormState;
    isAdvanceAction: boolean;
    auth: AuthData;
    loading: boolean;
  }) => {
    const {
      fixedIncome,
      passiveIncome,
      expenses,
      nonExpenses,
      incomeDelete,
      expenseDelete,
      currentBalance,
      debts,
      debtDelete,
      errorMessages,
      isActionRequired,
      shouldSent,
      isSubmit,
      isEdit
    } = form;
    const dispatch = useDispatch();
    const incomeInView = useInView({
      threshold: 0.5,
    });
    const debtInView = useInView({
      threshold: 0.5,
    });
    const expenseInView = useInView({
      threshold: 0.5,
    });
    const currentBalanceInView = useInView({
      threshold: 0.5,
    });

    useMemo(() => {
      if (incomeInView.inView) {
        dispatch(setActiveTab(SECTION_TABS.INCOME));
      } else if (expenseInView.inView) {
        dispatch(setActiveTab(SECTION_TABS.EXPENSE));
      } else if (currentBalanceInView.inView) {
        dispatch(setActiveTab(SECTION_TABS.CURRENT_BALANCE));
      } else if (debtInView.inView) {
        dispatch(setActiveTab(SECTION_TABS.DEBT));
      }
    }, [
      incomeInView,
      debtInView,
      expenseInView,
      currentBalanceInView,
      dispatch,
    ]);

    useMemo(() => {
      if (shouldSent) {
        dispatch(
          sendForm({
            auth: auth,
            form: form,
            isEdit: isEdit
          })
        );
      }
    }, [shouldSent, dispatch]);

    const fixedIncomeItems: FieldGroupItem = useMemo(() => {
      return {
        data: fixedIncome,
        props: [
          { label: "Name", placeholder: "Input name", name: "name" },
          { label: "Amount (USD)", placeholder: "0.00", name: "amount" },
        ],
      };
    }, [fixedIncome]);

    const passiveIncomeItems: FieldGroupItem = useMemo(() => {
      return {
        data: passiveIncome,
        props: [
          { label: "Name", placeholder: "Input name", name: "name" },
          { label: "Amount (USD)", placeholder: "0.00", name: "amount" },
        ],
      };
    }, [passiveIncome]);

    const expenseItems: FieldGroupItem = useMemo(() => {
      return {
        data: expenses,
        props: [
          { label: "Name", placeholder: "Input name", name: "name" },
          { label: "Amount (USD)", placeholder: "0.00", name: "amount" },
        ],
      };
    }, [expenses]);

    const nonExpenseItems: FieldGroupItem = useMemo(() => {
      return {
        data: nonExpenses,
        props: [
          { label: "Name", placeholder: "Input name", name: "name" },
          { label: "Amount (USD)", placeholder: "0.00", name: "amount" },
        ],
      };
    }, [nonExpenses]);

    const canDeleteIncome = useMemo(() => {
      if (fixedIncome.length === 1 && passiveIncome.length === 1) {
        return false;
      }

      return true;
    }, [fixedIncome, passiveIncome]);
    const canDeleteExpense = useMemo(() => {
      if (expenses.length === 1 && nonExpenses.length === 1) {
        return false;
      }

      return true;
    }, [expenses, nonExpenses]);

    return (
      <form
        className="pb-8"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex items-center justify-between pb-2 pt-6">
          <p
            className="heading-03"
            id={SECTION_TABS.INCOME}
            ref={incomeInView.ref}
          >
            Income
          </p>
          <span
            className={classNames({
              "cursor-pointer": canDeleteIncome,
              "cursor-not-allowed": !canDeleteIncome,
            })}
            onClick={() => {
              if (!canDeleteIncome) return;
              incomeDelete.isDelete && dispatch(closeIncomeDelete());
              !incomeDelete.isDelete && dispatch(openIncomeDelete());
            }}
          >
            {!incomeDelete.isDelete && (
              <TrashCan
                className={classNames({
                  "fill-disabled": !canDeleteIncome,
                })}
              />
            )}
            {incomeDelete.isDelete && <Close />}
          </span>
        </div>
        {errorMessages && errorMessages.includes(FORM_FIELD.INCOME) && (
          <p className="text-error label-01">
            {errorMessages.join(" OR ")} is required.
          </p>
        )}
        {isActionRequired && incomeDelete.isDelete && (
          <p className="text-error label-01">
            Delete the selected fields or click the Close icon to skip them.
          </p>
        )}
        {canDeleteIncome && incomeDelete.isDelete && (
          <div
            className="flex items-center justify-between pb-2 pt-2 bg-background pl-4 pr-4"
            style={{
              marginLeft: "-1rem",
              marginRight: "-1rem",
            }}
          >
            <p className="body-01 text-primary">
              {incomeDelete.fixedIncome.length +
                incomeDelete.passiveIncome.length}{" "}
              item selected
            </p>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(deleteIncome())}
            >
              <span className="body-compact-01 mr-2 text-secondary">
                Delete
              </span>
              <TrashCan className="fill-secondary" />
            </div>
          </div>
        )}
        <FinancialInformationFieldGroup
          title="Fixed income"
          name="fixedIncome"
          items={fixedIncomeItems}
          dispatch={dispatch}
          type={IncomeType.FIXED_INCOME}
          add={addFixedIncome}
          updateField={updateField}
          addMultipleItems={openModal}
          max={INCOME_MAX_ITEMS}
          isDeleteMode={incomeDelete.isDelete}
          updateDelete={updateIncomeDelete}
          selectAll={selectAllIncome}
          isAll={incomeDelete.isAllFixedIncome}
          isIndeterminate={incomeDelete.isIndeterminateFixedIncome}
          isAdvanceAction={isAdvanceAction}
          selections={MULTIPLES_FIXED_INCOME_FIELDS}
        />
        <FinancialInformationFieldGroup
          title="Passive income"
          name="passiveIncome"
          items={passiveIncomeItems}
          dispatch={dispatch}
          add={addPassiveIncome}
          type={IncomeType.PASSIVE_INCOME}
          updateField={updateField}
          addMultipleItems={openModal}
          max={INCOME_MAX_ITEMS}
          isBorderBottom
          isDeleteMode={incomeDelete.isDelete}
          updateDelete={updateIncomeDelete}
          selectAll={selectAllIncome}
          isAll={incomeDelete.isAllPassiveIncome}
          isIndeterminate={incomeDelete.isIndeterminatePassiveIncome}
          isAdvanceAction={isAdvanceAction}
          selections={MULTIPLES_PASSIVE_INCOME_FIELDS}
        />
        <div className="flex items-center justify-between pb-2 pt-6">
          <p
            className="heading-03"
            id={SECTION_TABS.EXPENSE}
            ref={expenseInView.ref}
          >
            Expenses
          </p>
          <span
            className={classNames({
              "cursor-pointer": canDeleteExpense,
              "cursor-not-allowed": !canDeleteExpense,
            })}
            onClick={() => {
              if (!canDeleteExpense) return;
              expenseDelete.isDelete && dispatch(closeExpenseDelete());
              !expenseDelete.isDelete && dispatch(openExpenseDelete());
            }}
          >
            {!expenseDelete.isDelete && (
              <TrashCan
                className={classNames({
                  "fill-disabled": !canDeleteExpense,
                })}
              />
            )}
            {expenseDelete.isDelete && <Close />}
          </span>
        </div>
        {errorMessages && errorMessages.includes(FORM_FIELD.EXPENSES) && (
          <p className="text-error label-01">
            {errorMessages.join(" OR ")} is required.
          </p>
        )}
        {isActionRequired && expenseDelete.isDelete && (
          <p className="text-error label-01">
            Delete the selected fields or click the Close icon to skip them.
          </p>
        )}
        {canDeleteExpense && expenseDelete.isDelete && (
          <div
            className="flex items-center justify-between pb-2 pt-2 bg-background pl-4 pr-4"
            style={{
              marginLeft: "-1rem",
              marginRight: "-1rem",
            }}
          >
            <p className="body-01 text-primary">
              {expenseDelete.expenses.length + expenseDelete.nonExpenses.length}{" "}
              item selected
            </p>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(deleteExpense())}
            >
              <span className="body-compact-01 mr-2 text-secondary">
                Delete
              </span>
              <TrashCan className="fill-secondary" />
            </div>
          </div>
        )}
        <FinancialInformationFieldGroup
          title="Essential expenses"
          name="expenses"
          items={expenseItems}
          dispatch={dispatch}
          add={addExpense}
          updateField={updateField}
          addMultipleItems={openModal}
          type={ExpenseType.EXPENSE}
          max={EXPENSE_MAX_ITEMS}
          isDeleteMode={expenseDelete.isDelete}
          updateDelete={updateExpenseDelete}
          selectAll={selectAllExpense}
          isAll={expenseDelete.isAllExpenses}
          isIndeterminate={expenseDelete.isIndeterminateExpenses}
          isAdvanceAction={isAdvanceAction}
          selections={MULTIPLES_ESSENTIAL_EXPENSES_FIELDS}
        />
        <FinancialInformationFieldGroup
          title="Non-essential expenses"
          name="nonExpenses"
          items={nonExpenseItems}
          dispatch={dispatch}
          add={addNonExpense}
          type={ExpenseType.NON_EXPENSE}
          updateField={updateField}
          addMultipleItems={openModal}
          max={EXPENSE_MAX_ITEMS}
          isBorderBottom
          isDeleteMode={expenseDelete.isDelete}
          updateDelete={updateExpenseDelete}
          selectAll={selectAllExpense}
          isAll={expenseDelete.isAllNonExpenses}
          isIndeterminate={expenseDelete.isIndeterminateNonExpenses}
          isAdvanceAction={isAdvanceAction}
          selections={MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS}
        />
        <div className="border-subtitle-00 pb-6">
          <div className="pt-6 pb-2 flex justify-between items-center">
            <div>
              <p
                className="heading-03 text-primary"
                id={SECTION_TABS.CURRENT_BALANCE}
                ref={currentBalanceInView.ref}
              >
                Current balance
              </p>
              <p className="label-02 text-helper">
                Current balance is the total amount of money in all your bank
                accounts.
              </p>
              {errorMessages && errorMessages.includes(FORM_FIELD.BALANCE) && (
                <p className="text-error label-01">
                  {errorMessages.join(" OR ")} is required.
                </p>
              )}
            </div>
            {currentBalance && (
              <span
                className="cursor-pointer"
                onClick={() => {
                  if (!currentBalance) return;
                  dispatch(removeCurrentBalance());
                }}
              >
                <TrashCan />
              </span>
            )}
          </div>
          {currentBalance && (
            <div className="financial-information-field-group-input-wrapper p-4 border border-solid border-subtle00">
              <InputField
                placeholder="0.00"
                label="Amount (USD)"
                name="current-balance"
                isFirst={currentBalance.validation.isFirst}
                isValid={currentBalance.validation.isValid}
                inputClassName="current-balance-input w-1/2"
                defaultValue={
                  +currentBalance.value === -1 ? "" : currentBalance.value
                }
                invalidType={currentBalance.validation.type}
                onChange={(e) => {
                  dispatch(updateCurrentBalance(e.target.value));
                }}
              />
            </div>
          )}
          {!currentBalance && (
            <div className="flex p-4 items-center">
              <p
                className="text-focus body-compact-01 pr-4 cursor-pointer"
                onClick={() => {
                  dispatch(addCurrentBalance());
                }}
              >
                Add
              </p>
              <p
                className="text-helper helper-text-01"
                style={{ lineHeight: "17px" }}
              >
                (1 fields)
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between pb-2 pt-6">
          <p className="heading-03" id={SECTION_TABS.DEBT} ref={debtInView.ref}>
            Debt
          </p>
          {debts.length > 0 && (
            <span
              className="cursor-pointer"
              onClick={() => {
                debtDelete.isDelete && dispatch(closeDebt());
                !debtDelete.isDelete && dispatch(openDebt());
              }}
            >
              {!debtDelete.isDelete && <TrashCan />}
              {debtDelete.isDelete && <Close />}
            </span>
          )}
        </div>
        {isActionRequired && debtDelete.isDelete && (
          <p className="text-error label-01">
            Delete the selected fields or click the Close icon to skip them.
          </p>
        )}
        {debtDelete.isDelete && (
          <div
            className="flex items-center justify-between pb-2 pt-2 bg-background pl-4 pr-4"
            style={{
              marginLeft: "-1rem",
              marginRight: "-1rem",
            }}
          >
            <p className="body-01 text-primary">
              {debtDelete.items.length} item selected
            </p>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => dispatch(deleteDebts())}
            >
              <span className="body-compact-01 mr-2 text-secondary">
                Delete
              </span>
              <TrashCan className="fill-secondary" />
            </div>
          </div>
        )}
        {debts.length > 0 && (
          <div className="py-2">
            {debts.map((debt, index) => (
              <div key={index}>
                <div
                  className="financial-information-field-group-input-wrapper p-4 border border-solid border-subtle00"
                  style={{ borderTop: index > 0 ? "none" : undefined }}
                >
                  <div
                    className={classNames("debt-input-wrapper", {
                      "is-delete-mode": debtDelete.isDelete,
                    })}
                  >
                    {debtDelete.isDelete && (
                      <div
                        style={{ gridRow: "1 / span 2", marginTop: "-0.25rem" }}
                      >
                        <Checkbox
                          labelText=""
                          id={`debt-${index}`}
                          onChange={(
                            _: React.ChangeEvent<HTMLInputElement>,
                            data: {
                              checked: boolean;
                              id: string;
                            }
                          ) => {
                            dispatch(
                              updateDebtDelete({
                                index: index,
                                checked: data.checked,
                              })
                            );
                          }}
                          checked={debt.isDelete}
                        />
                      </div>
                    )}
                    {debtFields.map((val: DebtType, jdex) => {
                      const value = debt[val];
                      const validation: ValidationItem = debt.validation[val];
                      return (
                        <InputField
                          key={`debt-${index}-${val}-${jdex}`}
                          placeholder="0.00"
                          label={debtLabel[val]}
                          name={val}
                          isFirst={validation.isFirst}
                          isValid={validation.isValid}
                          inputClassName="debt-input"
                          defaultValue={value}
                          invalidType={validation.type}
                          onChange={(e) => {
                            dispatch(
                              updateDebt({
                                name: val,
                                value: e.target.value,
                                index: index,
                              })
                            );
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex p-4 items-center mb-8">
          <p
            className="text-focus body-compact-01 pr-4 cursor-pointer"
            onClick={() => {
              dispatch(addDebt());
            }}
          >
            Add
          </p>
          <p
            className="text-helper helper-text-01"
            style={{ lineHeight: "17px" }}
          >
            ({debts.length}/{5} fields)
          </p>
        </div>
        <p className="text-helper label-02 pb-2">
          Your input can be viewed and edited after submitting the form.
        </p>
        {isActionRequired && (
          <InlineNotification
            kind="error"
            title="Action required to complete."
            onClose={() => {
              dispatch(closeErrorMessage());
              return true;
            }}
            subtitle={`Delete or skip selected fields before continue`}
            className="mb-2 error-label"
          />
        )}
        {!isActionRequired && errorMessages && (
          <InlineNotification
            kind="error"
            title="Missing required fields."
            onClose={() => {
              dispatch(closeErrorMessage());
              return true;
            }}
            subtitle={`Enter a valid ${errorMessages.join(" OR ")}.`}
            className="mb-2 error-label"
          />
        )}
        <div>
          <PrimaryButton
            className="btn-primary"
            renderIcon={ArrowRight}
            style={{ maxWidth: "unset", height: "fit-content" }}
            onClick={() => dispatch(submitForm())}
            disabled ={isSubmit}
          >
            Save and continue
          </PrimaryButton>
        </div>
      </form>
    );
  }
);
FinancialInformation.displayName = "FinancialInformation";
export default FinancialInformation;
