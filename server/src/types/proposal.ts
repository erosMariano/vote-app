export interface CreatedProposal {

    user: string;
    password: string;

    community: string;
    title: string;
    description: string;
    link: string;
    quantityTokens: number;
    typeVote: number;
    options: string[],
    period: number,
    networkBlockchain: number
    individualVote: number
    tokenPeopleVote: []
}

export interface EditVote {
    id: string;
    tokenPeopleVote: string;
}