import { convertTimestamp } from "./convertTimestamp";

describe("convertTimestamp", () => {
  // 현재 시간을 기준으로 테스트하기 위해 Date.now를 모킹
  beforeEach(() => {
    jest.useFakeTimers();

    const now = new Date("2024-03-20T12:00:00");
    jest.setSystemTime(now);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return '5분 전' for a timestamp 5 minutes ago", () => {
    const fiveMinutesAgo = new Date("2024-03-20T11:55:00");
    expect(convertTimestamp(fiveMinutesAgo)).toBe("5분 전");
  });

  it("should return '2시간 전' for a timestamp 2 hours ago", () => {
    const twoHoursAgo = new Date("2024-03-20T10:00:00");
    expect(convertTimestamp(twoHoursAgo)).toBe("2시간 전");
  });

  it("should return '3일 전' for a timestamp 3 days ago", () => {
    const threeDaysAgo = new Date("2024-03-17T12:00:00");
    expect(convertTimestamp(threeDaysAgo)).toBe("3일 전");
  });

  it("should return '일주일 전' for a timestamp 7 days ago", () => {
    const sevenDaysAgo = new Date("2024-03-13T12:00:00");
    expect(convertTimestamp(sevenDaysAgo)).toBe("일주일 전");
  });

  it("should return formatted date for timestamps older than a week", () => {
    const oldDate = new Date("2024-03-01T12:00:00");
    expect(convertTimestamp(oldDate)).toBe("2024년 3월 1일");
  });

  it("should return '0분 전' for future dates", () => {
    const futureDate = new Date("2024-03-21T12:00:00");
    expect(convertTimestamp(futureDate)).toBe("0분 전");
  });
});
