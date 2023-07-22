import { IntrusionPrevention } from "@carbon/icons-react";
import { InlineNotification, PrimaryButton } from "carbon-components-react";
import { useEffect, useState } from "react";

const ResultFooter = ({
  showCopy,
  onCopy,
  code,
}: {
  code?: string;
  showCopy: boolean;
  onCopy: () => void;
}) => {
 
  const [copyNotification, setCopyNotification] = useState(false);
  const copyToClipboard = (str: string) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
        setCopyNotification(true);
        return navigator.clipboard.writeText(str);
    }
    return Promise.reject("The Clipboard API is not available.");
  };

  useEffect(() => {
    let timeout = null;
    if (!copyNotification) {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
    } else {
        timeout = setTimeout(() => {
            setCopyNotification(false);
        },1000);
    }
  },[copyNotification, setCopyNotification]);
  return (
    <div className="flex flex-col items-center justify-center bg-footer">
      <div className="h-container h-container-no-padding flex flex-col items-center justify-start px-8">
        <div className="result-footer-code pt-14 pb-16">
          <div>
            <div className="flex flex-col justify-center">
              <IntrusionPrevention width={24} height={24} />
              <p className="heading-04 text-black">
                Save your report for later?
              </p>
              <p className="body-02 mt-4 mb-4 text-black">
                We will provide a unique code for your report. You can use this
                code to quickly access your report the next time you visit.
              </p>
              {code && !showCopy && (
                <PrimaryButton
                  onClick={() => onCopy()}
                  className="btn-primary"
                  style={{ maxWidth: "unset", height: "fit-content" }}
                >
                  Generate code
                </PrimaryButton>
              )}
              {code && showCopy && (
                <div className="flex items-center">
                  <p className="body-02 text-black">Your code is: </p>
                  <span className="heading-02 text-black ml-4 mr-2">
                    {code}
                  </span>
                  <span
                    className="cursor-pointer body-compact-02 text-link_primary"
                    onClick={() => copyToClipboard(code)}
                  >
                    Copy
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <img src="/images/lllus-code.svg" />
            </div>
          </div>
        </div>
        <div className="w-full result-footer-line py-3">
          <p className="body-02 tex-primary">© 2023 IT</p>
        </div>
      </div>
      {copyNotification && showCopy && <InlineNotification
        title="Code copied to clipboard"
        kind="success"
        className="copy-notification"
        style={{
            position: 'fixed',
            left: '2rem',
            bottom: '2rem',
            maxWidth: '20rem'
        }}
      />}
    </div>
  );
};

export default ResultFooter;
