import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./styles.module.scss";
import Channel, { IChannelRoute } from "./channel/Channel";
import PageContianer from "@/components/layout/PageContainer/PageContianer";
import { GetTokenByCredentionals } from "@/services/channels/channels.services";
import useRedirect from "@/hooks/useRedirect";

export default function ChannelsLayout() {
  const { MINI_PAY, SNAPP } = useRedirect();

  const channels: IChannelRoute[] = [
    {
      name: "اسنپ",
      icon: <Icon icon='arcticons:snappdriver' />,
      path: "/snapp",
      image: "/images/channels/snapp.png",
      onActive() {
        GetTokenByCredentionals().then((res) => {
          SNAPP.goTransactions();
        });
      },
    },
    {
      name: "مینی پی",
      icon: <Icon icon='arcticons:snappdriver' />,
      path: "/mini-pay",
      image: "/images/channels/mini-pay.webp",
      onActive() {
        MINI_PAY.goMiniPay()
      },
    },
  ];

  return (
    <PageContianer title='کانال ها'>
      <div className={styles.layout}>
        <h1>کانال ها</h1>
        <div className={styles.channels}>
          {channels.map((channel) => {
            return <Channel {...channel} />;
          })}
        </div>
      </div>
    </PageContianer>
  );
}
