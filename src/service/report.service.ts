import {findReports} from "../repository/report.repository";


export const getReports = async(handled: boolean, page: number) => {
    const PAGE_SIZE = 20;
    const offset = (page - 1) * PAGE_SIZE;
    return await findReports(handled, offset, PAGE_SIZE);
}