import { Icon } from "@iconify/react/dist/iconify.js";
import styles from "./styles.module.scss";
import Channel, { IChannelRoute } from "./channel/Channel";
import PageContianer from "@/components/layout/PageContainer/PageContianer";

export default function ChannelsLayout() {
  const channels: IChannelRoute[] = [
    {
      name: "اسنپ",
      icon: <Icon icon='arcticons:snappdriver' />,
      path: "/snapp",
      image: "/images/channels/snapp.png",
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
