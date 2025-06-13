describe('PillPall App', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show the home screen with "My Medications" title', async () => {
    await expect(element(by.text('My Medications'))).toBeVisible();
  });

  it('should navigate to medications tab', async () => {
    await element(by.text('Medications')).tap();
    await expect(element(by.text('All Medications'))).toBeVisible();
  });

  it('should navigate to reminders tab', async () => {
    await element(by.text('Reminders')).tap();
    await expect(element(by.text('Medication Reminders'))).toBeVisible();
  });

  it('should navigate to analytics tab', async () => {
    await element(by.text('Analytics')).tap();
    await expect(element(by.text('Analytics'))).toBeVisible();
  });

  it('should navigate to settings tab', async () => {
    await element(by.text('Settings')).tap();
    await expect(element(by.text('Settings'))).toBeVisible();
  });

  it('should navigate back to home tab', async () => {
    await element(by.text('Home')).tap();
    await expect(element(by.text('My Medications'))).toBeVisible();
  });
});
