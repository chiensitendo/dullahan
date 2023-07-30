import React, { memo, useEffect, useRef } from "react";
import {
  DebtType,
  ExpenseData,
  FormState,
  FormStateItem,
  IncomeData,
  ValidationItem,
  addDebt,
  addExpense,
  addFixedIncome,
  addNonExpense,
  addPassiveIncome,
  closeErrorMessage,
  deleteItem,
  openModal,
  sendForm,
  setDeleteId,
  setFocus,
  submitForm,
  updateCurrentBalance,
  updateDebt,
  updateField,
} from "@/redux/formSlice";
import { Choice, ExpenseType, IncomeType, VALIDATION_TYPE } from "@/type";
import {
  EXPENSE_MAX_ITEMS,
  INCOME_MAX_ITEMS,
  MULTIPLES_ESSENTIAL_EXPENSES_FIELDS,
  MULTIPLES_FIXED_INCOME_FIELDS,
  MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS,
  MULTIPLES_PASSIVE_INCOME_FIELDS,
  getValidationMessage,
  tooltipText,
} from "@/type/const";
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  AnyAction,
} from "@reduxjs/toolkit";
import {
  InlineNotification,
  PrimaryButton,
  TextInput,
} from "carbon-components-react";
import { ChangeEventHandler, Dispatch, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Close, ArrowRight, Information } from "@carbon/icons-react";
import classNames from "classnames";
import { useInView } from "react-intersection-observer";
import { SECTION_TABS, setActiveTab } from "@/redux/tabSlice";
import { AuthData } from "../use-auth";
import { Toggletip, ToggletipButton, ToggletipContent } from "../Toggletip";

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
    inputClassName,
    onFocus,
    onBlur,
    onChange,
    value,
    id,
    disabled
  } = props;
  const inputRef: React.Ref<HTMLInputElement> = useRef(null);
  return (
    <div>
      <TextInput
        id={id + ""}
        defaultValue={defaultValue + ""}
        name={inputName}
        ref={inputRef}
        invalidText={
          isValid ? undefined : getValidationMessage(invalidType, name)
        }
        value={value}
        labelText={label}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        placeholder={placeholder}
        invalid={!isValid && !isFirst}
        className={inputClassName}
        style={{ borderBottom: removeBorderBottom ? "none" : undefined }}
      />
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
    selections,
    type,
    focusIndex,
  } = props;

  const components = useMemo(() => {
    let list: any[] = [];
    items.data.forEach((d, index) => {
      let isAllValid = true;
      let inputFields = items.props.map((prop, ind) => {
        const removeBorderBottom = index <= items.data.length - 2;
        const fieldValue = (d as any)[prop.name];
        const isValid = ((d.validation as any)[prop.name] as any)["isValid"];
        isAllValid = isAllValid && isValid;

        return (
          <InputField
            key={index + "-" + ind}
            placeholder={prop.placeholder}
            label={index === 0 ? prop.label : ""}
            name={prop.name}
            id={`${name}[${index}].${prop.name}`}
            inputName={`${name}[${index}].${prop.name}`}
            removeBorderBottom={removeBorderBottom}
            defaultValue={fieldValue}
            value={fieldValue}
            isFirst={((d.validation as any)[prop.name] as any)["isFirst"]}
            isValid={isValid}
            invalidType={((d.validation as any)[prop.name] as any)["type"]}
            index={index}
            disabled = {prop.name === "name" && d.isFixed}
            onFocus={() => {
              const ele = document.getElementById(
                `checkbox-item-${name}-${index}`
              );
              if (ele) {
                (ele as any).checked = true;
              }
              dispatch(
                setFocus({
                  isFocus: true,
                  field: name as any,
                  index: index,
                })
              );
            }}
            onBlur={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const ele = document.getElementById(
                `checkbox-item-${name}-${index}`
              );
              if (ele) {
                (ele as any).checked = false;
              }
              setTimeout(() => {
                dispatch(setDeleteId(undefined));
              },100);
              dispatch(
                setFocus({
                  isFocus: false,
                  field: name as any,
                  index: index,
                })
              );
            }}
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
      inputFields.push(
        <div
          key={inputFields.length}
          className="flex flex-col items-center justify-center close-wrapper"
          style={{ marginTop: index === 0 ? "36px" : undefined }}
          onClick={(e) => {
            dispatch(deleteItem({ index, field: name as any }));
          }}
        >
          <input
            className="checkbox-item"
            id={`checkbox-item-${name}-${index}`}
            hidden
            type="checkbox"
          />
          <Close
            className="cursor-pointer"
            style={{ marginBottom: isAllValid ? undefined : "16px" }}
            onClick={(e) => {
              dispatch(deleteItem({ index, field: name as any }));
            }}
          />
        </div>
      );

      list.push(inputFields);
    });
    return list;
  }, [items, focusIndex]);
  const borderClass = useMemo(() => {
    if (isBorderBottom) {
      return " border-subtitle-00 pb-8";
    }
    return "";
  }, [isBorderBottom]);
  return (
    <div className={"mt-4" + borderClass}>
      <div className="flex items-center">
        <p className="heading-01 mr-2" style={{ fontWeight: 600 }}>
          {title}
        </p>
        <Toggletip align="top-left">
          <ToggletipButton label="Additional information">
            <Information />
          </ToggletipButton>
          <ToggletipContent>
            <p className="text-white heading-01">{(tooltipText as any)[name as any]}</p>
          </ToggletipContent>
        </Toggletip>
      </div>
      <div
        className={classNames(
          "financial-information-field-group-input-wrapper",
          "is-view-mode"
        )}
      >
        {components}
      </div>
      <div className="flex p-4 items-center">
        <p
          className={`body-compact-01 mr-8 ${
            items.data.length < max
              ? "text-focus cursor-pointer hover:underline"
              : "text-disabled"
          }`}
          onClick={() => items.data.length < max && dispatch(add())}
        >
          Add custom
        </p>
        {true && (
          <p
            className={`body-compact-01 mr-8 ${
              items.data.length < max
                ? "text-focus cursor-pointer hover:underline"
                : "text-disabled"
            }`}
            onClick={() =>
              items.data.length < max &&
              dispatch(
                addMultipleItems({
                  name: name,
                  max: max,
                  selections: selections,
                  type: type,
                })
              )
            }
          >
            Choose from suggestion
          </p>
        )}
        <p
          className="text-helper helper-text-01"
          style={{ lineHeight: "17px" }}
        >
          ({max - items.data.length}/{max} fields left)
        </p>
      </div>
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
  selections: Choice[];
  type: string;
  focusIndex?: number;
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
  id?: string;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  isValid?: boolean;
  isFirst?: boolean;
  invalidType?: VALIDATION_TYPE;
  defaultValue?: string;
  index?: number;
  inputClassName?: string;
  value?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  disabled?: boolean;
}

const FinancialInformation = memo(
  ({
    form,
    auth,
  }: {
    form: FormState;
    auth: AuthData;
  }) => {
    const {
      fixedIncome,
      passiveIncome,
      expenses,
      nonExpenses,
      currentBalance,
      debts,
      errorMessages,
      shouldSent,
      isSubmit,
      isEdit,
      focus,
    } = form;
    const dispatch = useDispatch();

    const incomeInView = useInView({
      threshold: 0.1,
    });
    const debtInView = useInView({
      threshold: 0.5,
    });
    const expenseInView = useInView({
      threshold: 0.5,
    });
    const currentBalanceInView = useInView({
      threshold: 1,
    });

    const formRef: React.LegacyRef<HTMLFormElement> = useRef(null);

    useEffect(() => {
      if (formRef.current) {
        formRef.current.scrollBy({
          top: 200,
          left: 0,
        });
      }
    }, [formRef]);

    useMemo(() => {
      if (currentBalanceInView.inView) {
        dispatch(setActiveTab(SECTION_TABS.CURRENT_BALANCE));
      } else if (incomeInView.inView) {
        dispatch(setActiveTab(SECTION_TABS.INCOME));
      } else if (expenseInView.inView) {
        dispatch(setActiveTab(SECTION_TABS.EXPENSE));
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
            isEdit: isEdit,
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

    return (
      <form
        className="pb-8 dullahan-form-wrapper"
        id="dullahan-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
        ref={formRef}
      >
        <div
          className="border-subtitle-00 pb-6"
          id={SECTION_TABS.CURRENT_BALANCE}
          ref={currentBalanceInView.ref}
        >
          <div className="pt-6 pb-2 flex justify-between items-center">
            <div>
              <p className="heading-03 text-primary">
                Current balance <span className="text-secondary">*</span>
              </p>
              <p className="label-02 text-helper">
                {`The total amount of money that you currently have. Please include the money you have from all your bank account and wallets (including saving money)`}
              </p>
            </div>
          </div>
          <div className="financial-information-field-group-input-wrapper">
            <InputField
              placeholder="0.00"
              label="Amount (USD)"
              name="current-balance"
              id ="current-balance"
              isFirst={currentBalance.validation.isFirst}
              isValid={currentBalance.validation.isValid}
              inputClassName="current-balance-input w-1/2"
              defaultValue={currentBalance.value}
              invalidType={currentBalance.validation.type}
              value={currentBalance.value}
              onChange={(e) => {
                dispatch(updateCurrentBalance(e.target.value));
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between pb-2 pt-4">
          <p
            className="heading-03"
            id={SECTION_TABS.INCOME}
            ref={incomeInView.ref}
          >
            Income
          </p>
        </div>
        <FinancialInformationFieldGroup
          title="Active income"
          name="fixedIncome"
          items={fixedIncomeItems}
          dispatch={dispatch}
          type={IncomeType.FIXED_INCOME}
          add={addFixedIncome}
          updateField={updateField}
          addMultipleItems={openModal}
          max={INCOME_MAX_ITEMS}
          selections={MULTIPLES_FIXED_INCOME_FIELDS}
          focusIndex={focus.fixedIncome}
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
          selections={MULTIPLES_PASSIVE_INCOME_FIELDS}
          focusIndex={focus.passiveIncome}
        />
        <div className="flex items-center justify-between pb-2 pt-4">
          <p
            className="heading-03"
            id={SECTION_TABS.EXPENSE}
            ref={expenseInView.ref}
          >
            Expenses
          </p>
        </div>
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
          selections={MULTIPLES_ESSENTIAL_EXPENSES_FIELDS}
          focusIndex={focus.expenses}
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
          selections={MULTIPLES_NON_ESSENTIAL_EXPENSES_FIELDS}
          focusIndex={focus.nonExpenses}
        />
        <div className="flex items-center justify-between pb-2 pt-4">
          <div>
          <p className="heading-03" id={SECTION_TABS.DEBT} ref={debtInView.ref}>
            Debt
          </p>
          <p className="label-02 text-helper">
                {`Debt is those events that lead you down the path of financial hardship! Note it down here to devise a master plan to help you break free from its burden!`}
              </p>
          </div>
        </div>
        {debts.length > 0 && (
          <div className="py-2">
            {debts.map((debt, index) => {
              const debtCloseId = `checkbox-item-debts-${index}`;
              return (
                <div key={index}>
                  <div
                    className="financial-information-field-group-input-wrapper p-4 border border-solid border-subtle00"
                    style={{ borderTop: index > 0 ? "none" : undefined }}
                  >
                    <div className={classNames("debt-input-wrapper")}>
                      {debtFields.map((val: DebtType, jdex) => {
                        const value = debt[val];
                        const validation: ValidationItem = debt.validation[val];
                        return (
                          <InputField
                            key={`debt-${index}-${val}-${jdex}`}
                            placeholder={val !== "name" ? "0.00" : "Input name"}
                            label={debtLabel[val]}
                            name={val}
                            id={"debt-" + index +"-"+ val}
                            isFirst={validation.isFirst}
                            isValid={validation.isValid}
                            inputClassName="debt-input"
                            defaultValue={value}
                            value={value}
                            invalidType={validation.type}
                            onFocus={() => {
                              const ele = document.getElementById(debtCloseId);
                              if (ele) {
                                (ele as any).checked = true;
                              }
                              dispatch(
                                setFocus({
                                  isFocus: true,
                                  field: "debts",
                                  index: index,
                                })
                              );
                            }}
                            onBlur={() => {
                              const ele = document.getElementById(debtCloseId);
                              if (ele) {
                                (ele as any).checked = false;
                              }
                              setTimeout(() => {
                                dispatch(setDeleteId(undefined));
                              },100);
                              dispatch(
                                setFocus({
                                  isFocus: false,
                                  field: "debts",
                                  index: index,
                                })
                              );
                            }}
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
                      <div
                        className="close-wrapper flex"
                        key={`debt-${index}-close-${debtFields.length}`}
                        style={{
                          gridColumn: 3,
                          gridRow: "1/ span 2",
                          marginLeft: "-16px",
                        }}
                        onClick={(e) =>
                          dispatch(deleteItem({ index, field: "debts" }))
                        }
                      >
                        <input
                          className="checkbox-item"
                          id={debtCloseId}
                          hidden
                          type="checkbox"
                        />
                        <Close
                          className="cursor-pointer"
                          style={{ marginBottom: false ? undefined : "16px" }}
                          onClick={(e) => {
                            dispatch(deleteItem({ index, field: "debts" }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="flex p-4 items-center mb-8">
          <p
            className={classNames("body-compact-01 mr-8", {
              "text-focus cursor-pointer hover:underline": debts.length < 5,
              "text-disabled": debts.length >= 5,
            })}
            onClick={() => {
              debts.length < 5 && dispatch(addDebt());
            }}
          >
            Add custom
          </p>
          <p
            className="text-helper helper-text-01"
            style={{ lineHeight: "17px" }}
          >
            ({5 - debts.length}/{5} fields left)
          </p>
        </div>
        <p className="text-helper label-02 pb-2">
          Your input can be viewed and edited after submitting the form.
        </p>
        {errorMessages && (
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
            disabled={isSubmit}
          >
            View financial report
          </PrimaryButton>
        </div>
      </form>
    );
  }
);
FinancialInformation.displayName = "FinancialInformation";
export default FinancialInformation;
