import Link from 'next/link';
import EventList from './EventList';
import classes from './event-item.module.css';
import Button from '../ui/Button';
import DateIcon from '../icons/date-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';
import LocationIcon from '../icons/address-icon';
import Image from 'next/image';
const EventItem = (props) => {
  const { title, image, date, location, id } = props;
  const formatedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formatedAddress = location.replace(' ,', '\n');
  return (
    <li className={classes.item}>
      <Image src={image} alt={title} width={150} height={150} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
        </div>
        <div className={classes.date}>
          <DateIcon />
          <time>{formatedDate}</time>
        </div>
        <div className={classes.address}>
          <LocationIcon />
          <address>{formatedAddress}</address>
        </div>
        <div className={classes.actions}>
          <Button link={'/events/' + id}>
            <span>Read More </span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
