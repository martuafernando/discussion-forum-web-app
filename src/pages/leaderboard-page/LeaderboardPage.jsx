import './LeaderboardPage.css';
import {useEffect} from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {asyncGetLeaderboard} from '../../redux/states/leaderboard/action';
import LeaderboardList from '../../components/leaderboard-list/LeaderboardList';
import Flash from '../../components/flash/Flash';

export default function LeaderboardPage() {
  const dispatch = useDispatch();
  const leaderboard = useSelector((store) => store.leaderboard);

  useEffect(() => {
    dispatch(asyncGetLeaderboard());
  }, [dispatch]);


  return (
    <main className="leaderboard-page">
      <Flash className="leaderboard-page__flash" />
      <LeaderboardList leaderboard={ leaderboard } />
    </main>
  );
}
