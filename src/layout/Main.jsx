import React from 'react'

const Main = ({ sidebar,projectTasks }) => {
    return (
        <main className="h-screen flex bg-gray-50">
            {/*Side-Bar AllProject Menu */}
            <div className="w-64 bg-slate-800 text-gray-100 p-4">
                {sidebar}
            </div>
            {/*Project-Tasks */}
            <div className='flex-1'>
                {projectTasks}
            </div>
        </main>
    )
}

export default Main