import useGlobalStates from "@/@redux/hooks/useGlobalStates";
import Button from "@/components/UI/Button/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

import styles from "./styles.module.scss";
import { useMutation } from "react-query";
import { GetTokenByCredentionals } from "@/services/channels/channels.services";

export interface IChannelRoute {
  name: string;
  path: "/snapp" | "/mini-pay";
  icon: JSX.Element;
  image: string;
  onActive: () => void;
}

export default function Channel({
  image,
  path,
  onActive,
  icon,
  name,
}: IChannelRoute) {
  const { user } = useGlobalStates();

  return (
    <div className={styles.channel}>
      <div className={styles.info}>
        <img src={image} />
        <span>{name}</span>
      </div>
      <div className={styles.buttons}>
        <Button
          icon={<Icon icon='flowbite:bell-active-solid' />}
          onClick={onActive}
          title='فعال سازی'
          variant='success'
          disabled={user.channel.snappay === false}
        />
      </div>
    </div>
  );
}
