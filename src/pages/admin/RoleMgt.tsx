import React, { useState } from "react";
import { useQuery } from "react-query";
import agent from "../../api/agent";
import { Table } from "../../components/shared";
import { IRole } from "../../interfaces/IRole";
import { ROLES } from "../../utils/constants";

const headers = [{ key: 'name', title: 'Role Name', type: 'text' }, { key: 'description', title: 'Role Description', type: 'text' }, { key: 'createdBy', title: 'Created By', type: 'text' }, { key: 'createdAt', title: 'Created At', type: 'date' }]
const permissionsHeaders = [{ key: 'name', title: 'Permission Name', type: 'text' }, { key: 'description', title: 'Permission Description', type: 'text' }]

function Role() {
    const [selectedRow, setSelectedRow] = useState<IRole>()
    const [searchRole, setSearchRole] = useState<string | null>(null);
    const [pageNumber, setPageNumber] = useState(0);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<string | null>(null);
    const pageSize = 5;


    const getAxiosParams = () => {
        const params = new URLSearchParams();
        if (searchRole && searchRole === '') params.append("name", searchRole);

        if (sortDirection) params.append("sortDirection", sortDirection);
        if (sortField) params.append("sortField", sortField);
        params.append("pageNumber", String(pageNumber));
        params.append("pageSize", String(pageSize));

        return params;
    }

    const { isSuccess, data, isError, error, isFetching, isPreviousData } = useQuery([ROLES, getAxiosParams()], () => agent.Role.getRoles(getAxiosParams()), { keepPreviousData: true });

    const setSortProperties = (field: string, direction: string) => {
        setSortField(field);
        setSortDirection(direction);
        console.log(field)
        console.log(sortField)
        console.log(direction)
        console.log(sortDirection)
    }

    return (
        <div>
            {isSuccess &&
                <Table
                    headers={headers}
                    data={data?.content!}
                    title="Roles Management"
                    collapseOnSelect={true}
                    onSelect={(selectedRole) => setSelectedRow(selectedRole)}
                    totalPages={data?.totalPages}
                    pagesRange={5}
                    onPageSelected={(selectedValue) => setPageNumber(selectedValue - 1)}
                    onMainAddButtonClick={() => console.log('add button clicked')}
                    onSort={(field, direction) => setSortProperties(field, direction)}
                />}
        </div>
    )
}

export default Role
