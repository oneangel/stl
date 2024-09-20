import Image from 'next/image';
import styles from './style.module.scss';

export default function TrafficImages() {
  return (
    <div className={styles.imageContainer}>
      <Image
        src="https://i.pinimg.com/564x/b1/f2/71/b1f2715c965cab552007dc4aa8623bae.jpg"  
        alt="Traffic Related Image"
        className={styles.image}
        layout="responsive" 
        width={500} 
        height={200}
      />
    </div>
  );
}
