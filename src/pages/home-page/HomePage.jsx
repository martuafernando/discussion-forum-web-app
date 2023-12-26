import {useEffect} from 'react';
import ThreadList from '@components/thread-list/ThreadList';
import CategoryList from '@components/category-list/CategoryList';
import ThreadCreateNew from '@components/thread-create-new/ThreadCreateNew';
import './HomePage.css';
import LeaderboardOverviewList
  from '@components/leaderboard-overview-list/LeaderboardOverviewList';
import {useNavigate, Outlet} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {asyncGetThread} from '../../redux/states/threads/action';
import {asyncGetLeaderboard} from '../../redux/states/leaderboard/action';
import Flash from '../../components/flash/Flash';
import useQuery from '../../hooks/useQuery';

export default function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const threads = useSelector((store) => store.threads);
  const leaderboard = useSelector((store) => store.leaderboard);
  const user = useSelector((store) => store.user);
  const categories = threads ?
    Array.from(new Set(threads.map((thread) => thread.category))) :
    [];
  const query = useQuery();

  useEffect(() => {
    dispatch(asyncGetThread());
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);

  function onCreateThreadClickedHandler() {
    navigate('/thread/create');
  }

  function filterThreads({threads, keyword, category}) {
    return threads.filter((thread) => {
      const title = thread.title.toLowerCase().match(/\b\w+\b/g);
      const body = thread.body.toLowerCase().match(/\b\w+\b/g);
      return (
        (keyword ? title.includes(keyword) || body.includes(keyword) : true) &&
        (category ? thread.category === category : true)
      );
    });
  }

  const filteredThreads = filterThreads({
    threads,
    keyword: query.get('keyword'),
    category: query.get('category'),
  });

  return (
    <>
      <div className="home-page">
        <main className="home-page__main">
          <Flash className="home-page__flash" />
          <ThreadCreateNew
            className="home-page__thread-create-new"
            avatarUrl={user.avatar}
            onClick={onCreateThreadClickedHandler}
          />
          <ThreadList threads={filteredThreads} />
          <hr className="home-page__divider" />
        </main>
        <aside className="home-page__sidebar">
          <CategoryList categories={categories} />
          <LeaderboardOverviewList leaderboard={leaderboard.slice(0, 5)} />
        </aside>
      </div>
      <Outlet />
    </>
  );
}
