import { formatDate } from "../../utils/utils";

describe("formatDate utils", () => {
  it('should format ISO date string to "DD MMMM YYYY"', () => {
    const isoString = "2024-06-19T12:00:00Z";
    const result = formatDate(isoString);
    expect(result).toBe("19 Juni 2024");
  });

  it('should return "Invalid date" for invalid ISO date string', () => {
    const isoString = "invalid-date";
    const result = formatDate(isoString);
    expect(result).toBe("Invalid date");
  });
});