import StatementService from "../../services/statement";
import type { Statement, StatementList } from "../../types/statement";

export default defineEventHandler(async (event) => {
    const { statementCode } = getQuery(event) as { statementCode: string };
    const { sort } = getQuery(event) as { sort: string };
    const { rowsPerPage } = getQuery(event) as { rowsPerPage: number };
    const { start } = getQuery(event) as { start: number };

    return await StatementService.listStatements(
        statementCode,
        sort,
        rowsPerPage, 
        start
    ) as StatementList;
});