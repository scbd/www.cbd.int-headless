import { Statement, StatementList } from "../../types/statement";
import StatementService from "../../services/statement";

export default defineEventHandler(async (event) => {
    const { statementCode } = getQuery(event) as { statementCode: string };
    if(!statementCode) { 
        return await StatementService.listStatements() as StatementList;
    } else {
        return await StatementService.getStatement(statementCode) as Statement;
    };
});