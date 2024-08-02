import { Faker, pt_BR } from '@faker-js/faker';
import axios from 'axios';

function generateCPF(): string {
    // Função para gerar um número aleatório entre min e max (inclusivo)
    function getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Função para calcular um dos dígitos verificadores
    function calculateVerifierDigit(cpf: number[]): number {
        let sum = 0;
        for (let i = 0; i < cpf.length; i++) {
            sum += cpf[i] * (cpf.length + 1 - i);
        }
        let remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
    }

    // Gerar os primeiros nove dígitos aleatórios
    let cpf: number[] = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(getRandomInt(0, 9));
    }

    // Calcular o primeiro dígito verificador
    cpf.push(calculateVerifierDigit(cpf));

    // Calcular o segundo dígito verificador
    cpf.push(calculateVerifierDigit(cpf));

    // Formatar o CPF como uma string
    return cpf.join('');
}

function getRandomName(): { firstName: string, lastName: string, fullName: string } {

    const fakerBr = new Faker({ locale: [pt_BR] })

    const firstName = fakerBr.person.firstName();
    const lastName = fakerBr.person.lastName();

    const fullName = fakerBr.person.fullName({
        'firstName': firstName,
        'lastName': lastName
    })
    return { firstName, lastName, fullName };
}

function getRandomEmail(firstName: string, lastName: string): { email: string } {

    const fakerBr = new Faker({ locale: [pt_BR] })

    const email = fakerBr.internet.email({
        'firstName': firstName,
        'lastName': lastName
    })

    return { email };
}

async function generateCEP(): Promise<Object> {
    try {
        const response = await axios.get('https://geradornv.com.br/wp-json/api/v2/cep/random');
        return response.data;
    } catch (error) {
        console.error('Erro ao obter o CEP:', error);
        throw new Error('Não foi possível obter o CEP');
    }
}

export async function generateData(): Promise<Object> {
    const getName = getRandomName()
    const getEmail = getRandomEmail(getName.firstName, getName.lastName)
    const cep = await generateCEP()
    //Adicionado zep
    //Endereco nao precisa pois a aplicacao deve retornar rua, complemento etc...
    //Pais ao precisa pois a aplicacao deve retornar rua, complemento etc...
    //Estado ao precisa pois a aplicacao deve retornar rua, complemento etc...
    //Cidade ao precisa pois a aplicacao deve retornar rua, complemento etc...
    //Job title

    return {
        firstName: getName.firstName,
        lastName: getName.lastName,
        fullName: getName.fullName,
        ...getEmail,
        ...cep,
        cpf: generateCPF()
    }
}
