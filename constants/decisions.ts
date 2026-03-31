export type Decision = { name: string; dtt?: true }


export const DECISION: Record<string, Decision[]> = {
    COP: [
        { name: 'COP-16', dtt: true },
        { name: 'COP-15', dtt: true },
        { name: 'CBD-EXCOP-02' },
        { name: 'COP-14', dtt: true },
        { name: 'COP-13', dtt: true },
        { name: 'COP-12', dtt: true },
        { name: 'COP-11', dtt: true },
        { name: 'COP-10', dtt: true },
        { name: 'COP-09', dtt: true },
        { name: 'COP-08', dtt: true },
        { name: 'COP-07', dtt: true },
        { name: 'COP-06', dtt: true },
        { name: 'COP-05', dtt: true },
        { name: 'EXCOP-01' },
        { name: 'COP-04', dtt: true },
        { name: 'COP-03', dtt: true },
        { name: 'COP-02', dtt: true },
        { name: 'COP-01', dtt: true }
    ],
    CP: [
        { name: 'CP-MOP-11' },
        { name: 'CP-MOP-10' },
        { name: 'CP-EXMOP-01' },
        { name: 'CP-MOP-9' },
        { name: 'MOP-08' },
        { name: 'MOP-07' },
        { name: 'MOP-06' },
        { name: 'MOP-05' },
        { name: 'MOP-04' },
        { name: 'MOP-03' },
        { name: 'MOP-02' },
        { name: 'MOP-01' }
    ],
    NP: [
        { name: 'NP-MOP-05' },
        { name: 'NP-MOP-04' },
        { name: 'NP-MOP-03' },
        { name: 'NP-MOP-02' },
        { name: 'NP-MOP-01' }
    ]
}