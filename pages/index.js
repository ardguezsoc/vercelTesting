import Head from "next/head";
import React from "react";
import EventList from "./components/events/EventList";

import { getFeaturedEvents } from "../helpers/api-util";

function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>adri page</title>
      </Head>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
export default HomePage;
