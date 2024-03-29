import { Heading, Text, useToast, VStack } from 'native-base';
import React, { useState } from 'react';

import Logo from '../assets/logo.svg'

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../serveces/api';

export function New(){

    const [titulo,setTitle] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const toast = useToast()

    async function handlePollCreate() {
        if (!titulo.trim()) {
            return toast.show({
                title: 'Informar o nome ao seu bolão!',
                placement: 'top',
                bgColor: 'red.500'
            })
        }

        try {
            setIsLoading(true)

            await api.post('/pools', {titulo})

            toast.show({
                title: 'Bolão criado!',
                placement: 'top',
                bgColor: 'green.500'
            })

            setTitle('')

        } catch (error) {
            console.log(error);

            toast.show({
                title: 'Não foi possível criar seu bolão!',
                placement: 'top',
                bgColor: 'red.500'
            })
            
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title='Criar novo bolão'/>

            {/* Ela deixa os elementos um emabixo do outro */}
            <VStack mt={8} mx={5} alignItems="center">
                <Logo />

                <Heading 
                    fontFamily="heading"
                    color="white"
                    fontSize="xl"
                    my={8}
                    textAlign="center"
                >
                    Crie seu próprio bolão da copa {'\n'}
                    e compartilhe entre amigos!
                </Heading>

                <Input 
                    mb={2}
                    placeholder="Qual nome do seu bolão?"
                    onChangeText={setTitle}
                    value={titulo}
                />

                <Button 
                    title='CRIAR MEU BOLÃO'
                    onPress={handlePollCreate}
                    isLoading={isLoading}
                />

                <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
                    Após criar seu bolão, você receberá um código único 
                    que poderá usar para convidar outras pessoas.
                </Text>

            </VStack>
        </VStack>
    );
}