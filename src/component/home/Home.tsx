
import React from 'react'
import { Button } from '../../common/formControls'
import { logout } from '../../common/utils/helper'

function Home() {
    return (
        <div>
            Welcome Home!
            <Button type="button" name="Logout" onClick={() => logout()} useHalfWith={true} isBusy={false} />
        </div>
    )
}

export default Home
