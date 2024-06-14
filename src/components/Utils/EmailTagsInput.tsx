import { useState, ChangeEvent, KeyboardEvent } from "react";
import "./EmailTagsInput.css"; // Create a CSS file for styling

type Props = {
  onEmailsChange: (emails: string[]) => void;
};

const EmailTagsInput = ({ onEmailsChange }: Props) => {
  const [emails, setEmails] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      if (!emails.includes(inputValue.trim())) {
        setEmails([...emails, inputValue.trim()]);
        onEmailsChange([...emails, inputValue.trim()]);
      }
      setInputValue("");
      event.preventDefault();
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
    onEmailsChange(emails.filter((email) => email !== emailToRemove));
  };

  return (
    <>
      <h1 className="mb-1">Add league members by email</h1>
      <div className="email-tags-input">
        <div className="tags-container">
          {emails.map((email) => (
            <div key={email} className="tag">
              {email}
              <button
                type="button"
                className="remove-tag"
                onClick={() => removeEmail(email)}
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="email"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Add email (press Enter to add)"
            className="email-input min-w-[100%]"
          />
        </div>
      </div>
    </>
  );
};

export default EmailTagsInput;
