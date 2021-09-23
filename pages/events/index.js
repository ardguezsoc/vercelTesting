import { Fragment } from "react";
import { useRouter } from "next/router";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../components/events/EventList";
import EventsSearch from "../components/events/eventSearch";

function AllEVentsPage({ eventList }) {
  const router = useRouter();
  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={eventList} />;
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      eventList: events,
    },
    revalidate: 60,
  };
}
export default AllEVentsPage;
