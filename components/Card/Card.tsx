import Image from 'next/image';

import s from './Card.module.css'

interface Props {
  title: string
  description: string
  icon?: string
}

const Card: React.FC<Props> = ({ title, description, icon }) => {
  return (
    <div className={s.root}>
      <div className={s.cardSection}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.description}>{description}</p>
      </div>

      {icon && (
        <div className={s.cardSection}>
          <Image
            src={icon}
            alt={title}
            title={title}
            width={56}
            height={56}
            className="rounded-full"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
      )}
    </div>
  );
}

export default Card
