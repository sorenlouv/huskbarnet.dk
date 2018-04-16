import jest from 'jest';
import res from './response.json';
import {
  formatReminders,
  getDates,
  getReminderMessages
} from '../../../cloud-functions/functions/getRemindersHelpers';

describe('formatReminders', () => {
  it('should format reminders correctly', () => {
    expect(formatReminders(res)).toMatchSnapshot();
  });
});

describe('getDates', () => {
  it('should return 7 dates ', () => {
    expect(getDates('2015-04-01')).toEqual([
      '2015-01-01',
      '2014-11-01',
      '2014-04-01',
      '2014-01-01',
      '2011-04-01',
      '2010-04-01',
      '2003-04-01'
    ]);
  });
});

describe('getReminderMessages', () => {
  it('It should format messages correctly', () => {
    const adminMock = {};
    adminMock.database = () => adminMock;
    adminMock.ref = () => adminMock;
    adminMock.orderByChild = () => adminMock;
    adminMock.equalTo = () => adminMock;
    adminMock.once = () => adminMock;
    adminMock.then = cb => cb({ val: () => res });

    return expect(
      getReminderMessages('2017-12-22', adminMock)
    ).resolves.toEqual();
  });
});
