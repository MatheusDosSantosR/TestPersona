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

export function generateData(): object {
    return {
        cpf: generateCPF()
    }
}
