import { Center, Icon, Text } from 'native-base';
import React from 'react';
import {Fontisto} from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';


export function SignIn(){

  const {signIn, isUserLoading} = useAuth()

  return (
    <Center flex={1} bgColor="gray.900" p={7}>
      <Logo width={212} height={40} />
      <Button 
        title='ENTRAR COM GOOGLE'
        type='SECONDARY'
        mt={12}
        leftIcon={
          <Icon as={Fontisto} name="google" color="white" size="md" />
        }
        onPress={signIn}
        isLoading={isUserLoading}
        _loading={{
          _spinner: {color: '#fff'}
        }}
        />

        <Text color="#fff" textAlign="center" mt={4}>
          Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
        </Text>

    </Center>
  );
}