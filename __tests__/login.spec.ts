import inventoryPo from './pages/inventory.po';
import loginPo from './pages/login.po';

describe('Login', () => {
  beforeEach(async () => {
    await loginPo.go();
  });

  it.each`
    username | password | message
    ${'wrong_username'}| ${'secret_sauce'} | ${'Epic sadface: Username and password do not match any user in this service'},
    ${'standard_user'}| ${'wrong_password'} | ${'Epic sadface: Username and password do not match any user in this service'},
    ${'locked_out_user'}| ${'secret_sauce'} | ${'Epic sadface: Sorry, this user has been locked out.'}
  `('should display "$message" when username|password is "$username|$password"', async ({ username, password, message }) => {
    await loginPo.login(username, password);

    expect(await loginPo.getErrorMessage()).toEqual(message);
  });

  it('should go to inventory page when username and password are correct', async () => {
    await loginPo.login('standard_user', 'secret_sauce');

    expect(page.url()).toContain('/inventory.html');
    // expect(await inventoryPo.isInventoryPage()).toEqual(true);
  });
});
