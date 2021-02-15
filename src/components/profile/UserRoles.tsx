import { useState } from "react";
import { useQuery } from "react-query";
import agent from "../../api/agent";
import { IRole } from "../../interfaces/IRole";
import { ME_ROLES } from "../../utils/constants";
import { Table } from "../shared";

//type:'text|number|currency|date|hyperlink|image'
const headers = [{ key: 'name', title: 'Role Name', type: 'text' }, { key: 'description', title: 'Role Description', type: 'text' }, { key: 'createdBy', title: 'Created By', type: 'text' }, { key: 'createdAt', title: 'Created At', type: 'date' }]
const permissionsHeaders = [{ key: 'name', title: 'Permission Name', type: 'text' }, { key: 'description', title: 'Permission Description', type: 'text' }]

function Roles() {
    const [selectedRow, setSelectedRow] = useState<IRole>()
    const { isSuccess, data, isError, error } = useQuery(ME_ROLES, agent.User.currentUserRoles);
    const roleId = selectedRow?.id;
    const { isSuccess: permissionSuccess, data: permissions } = useQuery(['RolePermissions', roleId], () => agent.Role.getRolePermissions(roleId!), { enabled: !!roleId });

    if (isError) console.log('loading role error:', error);

    return (
        <div>
            {isSuccess &&
                <Table
                    headers={headers}
                    data={data!}
                    title="My Roles"
                    // isMultiSelectable={true}
                    // onMultiSelect={(selectedRoles) => console.log('selectedRoles', selectedRoles)}
                    collapseOnSelect={true}
                    onSelect={(selectedRole) => setSelectedRow(selectedRole)}
                />}

            {permissionSuccess &&
                <Table
                    headers={permissionsHeaders}
                    data={permissions!}
                    title="Role's Permissions"
                    onCloseIcon={() => setSelectedRow(undefined)}
                />}
        </div>
    )
}

export default Roles
