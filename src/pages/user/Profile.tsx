import React from 'react'
import TabHeader from '../../components/tab/TabHeader';

function Profile() {
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full">
                    <ul className="flex flex-row flex-wrap pt-1 pb-1 mb-0 list-none" role="tablist">
                        <TabHeader tabName="Profile" tabNumber={1} openTab={openTab} href="#link1" onTab={e => { e.preventDefault(); setOpenTab(1); }} />
                        <TabHeader tabName="Settings" tabNumber={2} openTab={openTab} href="#link2" onTab={e => { e.preventDefault(); setOpenTab(2); }} />
                        <TabHeader tabName="Options" tabNumber={3} openTab={openTab} href="#link3" onTab={e => { e.preventDefault(); setOpenTab(3); }} />
                    </ul>
                    <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-white rounded shadow-lg">
                        <div className="flex-auto px-4 py-5">
                            <div className="tab-content tab-space">
                                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                    <p>Tab 1 Content</p>
                                </div>
                                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                    <p>Tab 2 Content</p>
                                </div>
                                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                                    <p>Tab 3 Content</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile
