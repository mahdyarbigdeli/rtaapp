import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./styles.module.scss";
import Channel, { IChannelRoute } from "./channel/Channel";
import PageContianer from "@/components/layout/PageContainer/PageContianer";
import { GetTokenByCredentionals } from "@/services/channels/channels.services";
import useRedirect from "@/hooks/useRedirect";
import useGlobalStates from "@/@redux/hooks/useGlobalStates";

export default function ChannelsLayout() {
  const { user } = useGlobalStates();

  const { MINI_PAY, SNAPP } = useRedirect();

  const channels: any = [
    user.channel.snappay && {
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
    // #mini_pay
    user.channel.minipay && {
      name: "مینی پی",
      icon: <Icon icon='arcticons:snappdriver' />,
      path: "/mini-pay",
      image: "/images/channels/mini-pay.webp",
      onActive() {
        MINI_PAY.goMiniPay();
      },
    },
  ].filter((item) => !!item);

  return (
    <PageContianer title='کانال ها'>
      <div className={styles.layout}>
        <h1>کانال ها</h1>
        <div className={styles.channels}>
          {channels.map((channel: IChannelRoute) => {
            return <Channel {...channel} />;
          })}
        </div>
      </div>
    </PageContianer>
  );
}
