import { describe, test, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import InputForm from '../InputForm.vue';
import { global } from './globalMock';
import waitForExpect from 'wait-for-expect';

describe('InputForm.vue', () => {
  let component: VueWrapper<any>;

  beforeEach(() => {
    component = mount(InputForm, {
      global,
    });
  });

  test('should render component', async () => {
    expect(component.exists()).toBe(true);
  });

  test('validation should not have run', async () => {
    expect(component.find('.popover').exists()).toBe(false);
  });

  test('should have submit button disabled initially', async () => {
    const submit = component.get('button[type="submit"]');
    const address = component.get('input#address');
    await address.setValue('');
    await waitForExpect(() => {
      expect(submit.element.disabled).toBe(true);
    });
  });

  test('should have submit button enabled after entering address', async () => {
    const submit = component.get('button[type="submit"]');
    const address = component.get('input#address');
    await address.setValue('New York City');
    await waitForExpect(() => {
      expect(submit.element.disabled).toBe(false);
    });
  });

  test('should have error message on missing address', async () => {
    const address = component.get('input#address');
    await address.setValue('New York City');
    await address.setValue('');
    await waitForExpect(() => {
      expect(component.find('#address + .popover').exists()).toBe(true);
      expect(component.find('#address + .popover').text()).toBe('Address is required');
    });
  });

  test.each([
    { startDate: '2025-08-26', endDate: '2025-08-27', message: 'Minimum range must be one month' },
    { startDate: '2025-08-26', endDate: '2026-08-27', message: 'Maximum range is one year' },
    {
      startDate: '2025-08-26',
      endDate: '2025-0-25',
      message: 'Start date must be before (or equal to) end date',
    },
  ])(
    'should display $message for startDate $startDate and endDate $endDate',
    async ({ startDate, endDate, message }) => {
      const startDateInput = component.get('input#startDate');
      const endDateInput = component.get('input#endDate');
      await startDateInput.setValue(startDate);
      await endDateInput.setValue(endDate);
      await waitForExpect(() => {
        expect(component.find('.popover').exists()).toBe(true);
        expect(component.find('.popover').text()).toBe(message);
        expect(component.get('button[type="submit"]').element.disabled).toBe(true);
      });
    },
  );
});
