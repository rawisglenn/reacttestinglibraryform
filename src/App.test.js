import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type } from '@testing-library/user-event/dist/type';
import App from './App';

beforeEach(()=>{
  render(<App />);
});

const typeForm = ({email, password, confirmPassword}) => {
  const emailInputEl = screen.getByRole("textbox", {name:/email/i});
  const passwordInputEl = screen.getByLabelText("Password");
  const confirmPasswordInputEl = screen.getByLabelText(/confirm password/i);

  if(email){userEvent.type(emailInputEl,email);}
  if(password){userEvent.type(passwordInputEl,password);}
  if(confirmPassword){userEvent.type(confirmPasswordInputEl,confirmPassword);
}
  return{
    emailInputEl,
    passwordInputEl,
    confirmPasswordInputEl
  }
}

const clickBtn = () => {
  const submitBtn = screen.getByRole("button",{name:/submit/i});
  userEvent.click(submitBtn);
};

test('input should be empty', () => {
  const emailInputEl = screen.getByRole("textbox");
  const passwordInputEl = screen.getByLabelText("Password");
  const confirmPasswordInputEl = screen.getByLabelText(/confirm password/i);

  expect(emailInputEl.value).toBe("");
  expect(passwordInputEl.value).toBe("");
  expect(confirmPasswordInputEl.value).toBe("");
});


test('can type an email',()=>{
  //const emailInputEl = screen.getByRole("textbox", {name:/email/i});
  //expect(emailInputEl.value).toBe("");
  const {emailInputEl} = typeForm({email:"alucard@gmail.com"});
  expect(emailInputEl.value).toBe("alucard@gmail.com");
});


test('can type a password',()=>{
  //const passwordInputEl = screen.getByLab elText("Password");
  //expect(passwordInputEl.value).toBe("");
  //userEvent.type(passwordInputEl,"password!");
  const {passwordInputEl} = typeForm({password:"password!"});
  expect(passwordInputEl.value).toBe("password!");
});

test('can type confirmation password',()=>{
  const {confirmPasswordInputEl} = typeForm({confirmPassword:"password!"});
  expect(confirmPasswordInputEl.value).toBe("password!");
});

test('invalid email prompt',()=>{
  //const emailInputEl = screen.getByRole("textbox");
  //expect(emailInputEl.value).toBe("");
  //userEvent.type(emailInputEl,"alucardgmail.com");
  typeForm({email:"alucardgmail.com"});

  //const submitBtn = screen.getByRole("button");
  //userEvent.click(submitBtn);
  clickBtn();
  //expect(emailInputEl.value).toBe("alucardgmail.com");
  const emailErrorEl = screen.getByText(/the email you entered is invalid/);
  expect(emailErrorEl).toBeInTheDocument();
});

test("show password err if less than 5 char",()=>{
  //const emailInputEl = screen.getByRole("textbox",{name:/email/i,});
  //const passwordInputEl = screen.getByLabelText("Password");
  //const submitBtn = screen.getByRole("button");
  const passwordErrEl = screen.queryByText(/password less than 5 chars/i);
  
  expect(passwordErrEl).not.toBeInTheDocument();
  //userEvent.type(emailInputEl,"alice@gmail.com");
  //userEvent.type(passwordInputEl,"123");
  typeForm({email:"alucard@gmail.com",password:"1234"});
  //userEvent.click(submitBtn);
  clickBtn();

  const passwordErrEl2 = screen.queryByText(/password less than 5 chars/i);
  expect(passwordErrEl2).toBeInTheDocument();
});

test("password does not match", ()=>{
  //const emailInputEl = screen.getByRole("textbox",{name:/email/i,});
  //const passwordInputEl = screen.getByLabelText("Password");
  //const confirmPasswordInputEl = screen.getByLabelText(/confirm password/i);
  //const submitBtn = screen.getByRole("button");
  const passwordErrEl = screen.queryByText(/password does not match/i);

  //userEvent.type(emailInputEl,"ruby@gmail.com");
  typeForm({email:"ruby@gmail.com"});
  expect(passwordErrEl).not.toBeInTheDocument();
  //userEvent.type(passwordInputEl,"123456");
  //userEvent.type(confirmPasswordInputEl,"abcderf");
  typeForm({password:"1234567", confirmPassword:"abcdefg"});
  //userEvent.click(submitBtn);
  clickBtn();

  const passwordErrE2 = screen.queryByText(/password does not match/i);
  expect(passwordErrE2).toBeInTheDocument();
});

test("show no error msg if every input is valid",()=>{
  const emailErr = screen.queryByText(/the email you entered is invalid/); 
  const passwordErr = screen.queryByText(/password less than 5 chars/i);
  const confirmPasswordErr = screen.queryByText(/password does not match/i);

  typeForm({
    email:"alucard@gmail.com",
    password:"123456",
    confirmPassword:"123456"
  });

  expect(emailErr).not.toBeInTheDocument();
  expect(passwordErr).not.toBeInTheDocument();
  expect(confirmPasswordErr).not.toBeInTheDocument();

});