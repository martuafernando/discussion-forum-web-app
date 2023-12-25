import './LeaderboardPage.css'
import { useEffect } from "react"
import {
  useDispatch,
  useSelector
} from "react-redux"
import { asyncGetLeaderboard } from "../../redux/states/leaderboard/action"
import LeaderboardItem from '../../components/leaderboard-item/LeaderboardItem'
import LeaderboardList from '../../components/leaderboard-list/LeaderboardList'

export default function LeaderboardPage() {
  const dispatch = useDispatch()
  const leaderboard = useSelector(store => store.leaderboard)

  useEffect(() => {
    dispatch(asyncGetLeaderboard())
  }, [dispatch])


  return (
    <main className="leaderboard-page">
      <LeaderboardList leaderboard={ leaderboard } />
    </main>
  )
}