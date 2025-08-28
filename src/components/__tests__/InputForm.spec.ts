import { describe, test, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import InputForm from '../InputForm.vue';
import { global } from '../../__tests__/globalMock';
import waitForExpect from 'wait-for-expect';

describe('InputForm.vue', () => {
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    wrapper = mount(InputForm, {
      global,
    });
  });

  test('should render component', async () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('validation should not have run', async () => {
    expect(wrapper.find('.popover').exists()).toBe(false);
  });

  test('should have submit button disabled initially', async () => {
    const submit = wrapper.get('button[type="submit"]');
    const address = wrapper.get('input#address');
    await address.setValue('');
    await waitForExpect(() => {
      expect(submit.element.disabled).toBe(true);
    });
  });

  test('should have submit button enabled after entering address', async () => {
    const submit = wrapper.get('button[type="submit"]');
    const address = wrapper.get('input#address');
    await address.setValue('New York City');
    await waitForExpect(() => {
      expect(submit.element.disabled).toBe(false);
    });
  });

  test('should have error message on missing address', async () => {
    const address = wrapper.get('input#address');
    await address.setValue('New York City');
    await address.setValue('');
    await waitForExpect(() => {
      expect(wrapper.find('#address + .popover').exists()).toBe(true);
      expect(wrapper.find('#address + .popover').text()).toBe('Address is required');
    });
  });

  test.each([
    { startDate: '2025-08-26', endDate: '2025-08-27', message: 'Minimum range must be one month' },
    { startDate: '2025-08-26', endDate: '2026-08-27', message: 'Maximum range is one year' },
    {
      startDate: '2025-08-26',
      endDate: '2025-08-25',
      message: 'Start date must be before (or equal to) end date',
    },
  ])(
    'should display $message for startDate $startDate and endDate $endDate',
    async ({ startDate, endDate, message }) => {
      const startDateInput = wrapper.get('input#startDate');
      const endDateInput = wrapper.get('input#endDate');
      await startDateInput.setValue(startDate);
      await endDateInput.setValue(endDate);
      await waitForExpect(() => {
        expect(wrapper.find('.popover').exists()).toBe(true);
        expect(wrapper.find('.popover').text()).toBe(message);
        expect(wrapper.get('button[type="submit"]').element.disabled).toBe(true);
      });
    },
  );
});
