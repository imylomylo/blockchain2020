<template>
  <div>
    <h2>Peer Info</h2>
    <v-data-table :headers="headers" :items="peerinfo" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.id}}</td>
        <td class="text-xs-right">{{ props.item.addr}}</td>
        <td class="text-xs-right">{{ props.item.addlocal}}</td>
        <td class="text-xs-right">{{ props.item.services}}</td>
        <td class="text-xs-right">{{ props.item.lastsend}}</td>
        <td class="text-xs-right">{{ props.item.lastrecv}}</td>
        <td class="text-xs-right">{{ props.item.bytessent}}</td>
        <td class="text-xs-right">{{ props.item.bytesrecv}}</td>
        <td class="text-xs-right">{{ props.item.conntime}}</td>
        <td class="text-xs-right">{{ props.item.timeoffset}}</td>
        <td class="text-xs-right">{{ props.item.pingtime}}</td>
        <td class="text-xs-right">{{ props.item.version}}</td>
        <td class="text-xs-right">{{ props.item.subver}}</td>
        <td class="text-xs-right">{{ props.item.inbound}}</td>
        <td class="text-xs-right">{{ props.item.startingheight}}</td>
        <td class="text-xs-right">{{ props.item.banscore}}</td>
        <td class="text-xs-right">{{ props.item.synced_headers}}</td>
        <td class="text-xs-right">{{ props.item.synced_blocks}}</td>
        <td class="text-xs-right">{{ props.item.whitelisted}}</td>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import kmdrpc from "@/app/shared/components/kmdrpc";
import control from "@/app/shared/components/kmdrpc/control";
import network from "@/app/shared/components/kmdrpc/network";

const rpc = control.connect(
  "http://" +
    process.env.VUE_APP_WEBHOST +
    ":" +
    process.env.VUE_APP_WEBPORT +
    "/http://127.0.0.1:" +
    process.env.VUE_APP_RPCPORT,
  process.env.VUE_APP_RPCUSER,
  process.env.VUE_APP_RPCPASSWORD
);
export default {
  data() {
    return {
      items: [],
      headers: [
        {
          text: "ID",
          align: "left",
          value: "id"
        },
        { text: "addr", value: "addr" },
        { text: "addrlocal", value: "addrlocal" },
        { text: "services", value: "services" },
        { text: "lastsend", value: "lastsend" },
        { text: "lastrecv", value: "lastrecv" },
        { text: "bytessent", value: "bytessent" },
        { text: "bytesrecv", value: "bytesrecv" },
        { text: "conntime", value: "conntime" },
        { text: "timeoffset", value: "timeoffset" },
        { text: "pingtime", value: "pingtime" },
        { text: "version", value: "version" },
        { text: "subver", value: "subver" },
        { text: "inbound", value: "inbound" },
        { text: "startingheight", value: "startingheight" },
        { text: "banscore", value: "banscore" },
        { text: "synced_headers", value: "synced_headers" },
        { text: "synced_blocks", value: "synced_blocks" },
        { text: "whitelisted", value: "whitelisted" }
      ],    
      peerinfo: "will get overwritten"
    };
  },
  methods: {
    first: function(event) {}
  },
  created() {
    this.peerinfo = "hi";

    //   pass the configured rpc connection and fire it off to getpeerinfo
    network
      .getpeerinfo(rpc)
      .then(resp => {
        console.log("Incoming response");
        console.log(resp);
        this.peerinfo = resp;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
