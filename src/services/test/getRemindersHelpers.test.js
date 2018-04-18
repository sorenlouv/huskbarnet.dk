import dbResponse from './response.json';
import {
  formatReminders,
  getEmailsToSend,
  getDate
} from '../getRemindersHelpers';

describe('formatReminders', () => {
  it('should format reminders correctly', () => {
    expect(formatReminders(dbResponse)).toMatchSnapshot();
  });
});

describe('getDate', () => {
  it('should return correct dates', () => {
    expect(getDate('2015-04-01', 30)).toBe('2015-03-02');
  });
});

describe('getEmailsToSend', () => {
  it('It should format messages correctly', () => {
    const adminRefMock = {};
    adminRefMock.database = () => adminRefMock;
    adminRefMock.ref = () => adminRefMock;
    adminRefMock.orderByChild = () => adminRefMock;
    adminRefMock.equalTo = () => adminRefMock;
    adminRefMock.once = () => adminRefMock;
    adminRefMock.then = cb => cb({ val: () => dbResponse });

    return expect(
      getEmailsToSend('2017-12-22', adminRefMock)
    ).resolves.toMatchSnapshot();
  });
});
