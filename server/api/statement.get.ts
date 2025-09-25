import StatementService from "../../services/statement";
import type { Statement, StatementList } from "../../types/statement";

export default defineEventHandler(async (event) => {
    const { statementCode } = getQuery(event) as { statementCode: string };
    if(!statementCode) { 
        return await StatementService.listStatements() as StatementList;
    } else {
        return await StatementService.getStatement(statementCode) as Statement;
    };
});