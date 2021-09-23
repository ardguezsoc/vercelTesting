import { useRouter } from "next/router";
import { Fragment } from "react";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../components/events/EventList";
import ResultTitle from "../components/events/results-title";
import Button from "../components/ui/Button";
import ErrorAlert from "../components/ui/error-alert";

function FilteredEventPage(props) {
  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>invalid Filter :(</p>
        </ErrorAlert>

        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  const filterEvents = props.fevents;
  if (!filterEvents || filterEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter </p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultTitle date={date} />
      <EventList items={filterEvents} />
    </Fragment>
  );
}
export async function getServerSideProps({ params }) {
  const filterData = params.slug;

  const numYear = filterData[0];
  const numMonth = filterData[1];

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    2021 > numYear > 2030 ||
    1 > numMonth > 12
  ) {
    return {
      props: { hasError: true },
    };
  }
  const filterEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      events: filterEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
export default FilteredEventPage;
