import Header from 'component/header';
import * as S from './style';
import { useState } from 'react';
import LongInput1 from 'component/inputs/longinput1';
import LongButton1 from 'component/buttons/longbutton1';
import { Link } from 'react-router-dom';
import { TryLogin } from 'APIs/UserAPIs';

export default function LoginPage() {
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const onChangeHandler = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    
    const buttonClickHandler = async (e) => {
        e.preventDefault();
        if (!inputs.email) {
            alert("Insert your email.");

            return;
        }

        if (!inputs.password) {
            alert("Insert your Password.");

            return;
        }

        const regex = new RegExp(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);

        if (!regex.test(inputs.email)) {
            alert("Invalid E-mail.");

            return;
        }

        try {
            const result = await TryLogin(inputs.email, inputs.password);

            if (!result.success) {
                alert("Check your E-mail or password.")
            } else {
                // dispatch(signinUser({
                //     "accessToken": result.response.accessToken,
                //     "refreshToken": result.response.refreshToken,
                // }));

                // navigate("/");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
      <S.Main>
        <S.Header>
            <Header />
        </S.Header>
            <S.SigninForm action="">
                <LongInput1 props={{ id: "email", desc: "Insert your e-mail", color: "orange", placeholder: "Your E-mail", type: "text", value: inputs.email, callback: onChangeHandler }} />
                <LongInput1 props={{ id: "password", desc: "Insert your password", color: "blue", placeholder:"Your Password", type:"password" ,value : inputs.password ,callback :onChangeHandler}} />
                <S.TextWrapper>
                    Don't have an account?&nbsp;
                    <Link to='/signup'>Sign up</Link> 
                </S.TextWrapper>
                <LongButton1 props={{color:"rgb(245, 236, 229)" ,text :"Sign in" ,callback :buttonClickHandler}}/>
            </S.SigninForm>
            <S.Footer>@SSAFY D103. All rights reserved.</S.Footer>

      </S.Main>

   )
}
