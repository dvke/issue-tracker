"use client";
import { Select } from "@radix-ui/themes";

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
        </Select.Group>
        <Select.Item value="1">Uche Obiekwe</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
