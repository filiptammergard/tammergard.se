import CodeBlock from "@theme/CodeBlock";
import React, { ChangeEvent, useState } from "react";

export function CompareOperators() {
  const [leftValue, setLeftValue] = useState<string | number>(LEFT_VALUES[0]);

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    setLeftValue(e.target.value);
  }

  const codeString = `const leftValue = ${leftValue}
const rightValue = "${RIGHT_VALUE}"

leftValue || rightValue
// > ${LEFT_VALUES[leftValue] || RIGHT_VALUE}

leftValue ?? rightValue
// > ${LEFT_VALUES[leftValue] ?? RIGHT_VALUE}`;

  return (
    <>
      <label htmlFor="left-value" style={{ display: "block" }}>
        Choose left value
      </label>
      <select
        id="left-value"
        onChange={handleChange}
        style={{ display: "block", marginBlockEnd: "16px" }}
      >
        {Object.keys(LEFT_VALUES).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <CodeBlock className="language-ts">{codeString}</CodeBlock>
    </>
  );
}

const LEFT_VALUES = {
  "0": 0,
  null: null,
  undefined: undefined,
  false: false,
  NaN: NaN,
  '""': "",
  '"Non-empty string"': "Non-empty string",
  true: true,
} as const;

const RIGHT_VALUE = "This is a default value that could be anything.";
