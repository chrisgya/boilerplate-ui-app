import { useQuery } from "react-query";
import agent from "../../api/agent";
import { ME_ROLES } from "../../utils/constants";
import { Table } from "../shared";


function Roles() {
    const { isSuccess, data, isError, error } = useQuery(ME_ROLES, agent.User.currentUserRoles);
    //type:'text|number|currency|date|hyperlink|image'
    const headers = [{ key: 'name', title: 'Role Name', type: 'text' }, { key: 'description', title: 'Role Description', type: 'text' }, { key: 'createdBy', title: 'Created By', type: 'text' }, { key: 'createdAt', title: 'Created At', type: 'date' }]

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
                    isSelectable={true}
                    collapseOnSelect={true}
                    onSelect={(selectedRole) => console.log('selectedRole', selectedRole)}
                />}
        </div>
    )
}

export default Roles
