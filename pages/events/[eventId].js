import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../components/event-detail/event-summary";
import EventLogistic from "../components/event-detail/event-logistics";
import EventContent from "../components/event-detail/event-content";
function EventDetailPage({ selectedEvent }) {
  const { title, date, location, image, description } = selectedEvent;
  return (
    <Fragment>
      <EventSummary title={title} />
      <EventLogistic
        date={date}
        address={location}
        image={image}
        imageAlt={title}
      />
      <EventContent>
        <p>{description}</p>
      </EventContent>
    </Fragment>
  );
}

export default EventDetailPage;

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const data = await getEventById(params.eventId);

  return {
    props: {
      selectedEvent: data,
    },
    revalidate: 30,
  };
}
