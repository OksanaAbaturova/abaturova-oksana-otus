import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import SpinnerChakra from './components/CustomComponents/SpinnerChakra/SpinnerChakra';
import { useAppSelector } from './app/hook';
import { RootState } from './app/store';

const Home = lazy(() => import("./components/Home/Home"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));
const ListUsersPage = lazy(() => import("./components/Users/ListUsersPage/ListUsersPage"));
const UserSetting = lazy(() => import('./components/Users/UserSetting/UserSetting'));
const ListTasksPage = lazy(() => import('./components/Tasks/ListTasksPage/ListTasksPage'));
const TaskDetail  = lazy(() => import('./components/Tasks/TaskDetail/TaskDetail'));

function App() {

  const tasksDatas = useAppSelector((state :RootState) => {
    const initialData = Object.values(state.tasks.entities);
    return initialData;
  });
;
    const usersDatas = useAppSelector((state :RootState) => {
      const initialData = Object.values(state.users.entities);
      return initialData;
    });

  return <>
      <NavBar />
      <Suspense fallback={<SpinnerChakra />}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="task" element={<ListTasksPage tasks={tasksDatas} />} />
          <Route path="task/:taskId" element={<TaskDetail />} />
          <Route path="user" element={<ListUsersPage users={usersDatas}/>} />
          <Route path="user/:userId" element={<UserSetting />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
 </>
}

export default App;
