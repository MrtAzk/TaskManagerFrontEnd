import React from 'react'

const Main = ({ sidebar,projectTasks }) => {
    return (
        <main className="h-screen flex bg-gray-900">
            {/*Side-Bar AllProject Menu */}
            <div className="w-64 
                        bg-slate-900 text-gray-100 
                        p-4 border-r border-gray-700/50">
                {sidebar}
            </div>
            {/*Project-Tasks */}
            <div className='flex-1 
                        p-8 
                        bg-gray-800/90 
                        text-gray-100 
                        overflow-y-auto'>
                {projectTasks}
            </div>
        </main>
    )
}

export default Main