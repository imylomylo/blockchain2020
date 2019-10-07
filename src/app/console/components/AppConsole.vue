<template>
  <div>
    <v-container fluid>
      <v-card raised>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Attribute</th>
                <th class="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in Object.keys(getinfo)" :key="item.name">
                <td>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <span v-on="on">{{item}}</span>
                    </template>
                    <span>{{ tooltips[item] }}</span>
                  </v-tooltip>
                </td>
                <td>{{ getinfo[item] }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
      <!-- 
      This would be useful for regtest mode
      <v-card-actions>
        <v-slider v-model="slider" thumb-label></v-slider>
        <v-btn v-on:click="generate" small>Generate</v-btn>
      </v-card-actions> 
      -->
      <!-- 
    <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" class="px-3 pt-3 pb-3">
      <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
    </v-sheet> 
      -->
      <v-divider></v-divider>

      <v-card raised min-width="400" class="mx-auto">
        <v-card-title>Raw Data</v-card-title>
        <v-card-text>
          <pre>
          {{ getinfo }}
        </pre>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import kmdrpc from "@/app/shared/components/kmdrpc";
import control from "@/app/shared/components/kmdrpc/control";
import generating from "@/app/shared/components/kmdrpc/generating";

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
  inject: ["theme"],

  data() {
    return {
      getinfo: "will get overwritten",
      slider: 1,
      snackbar: false,
      tooltips: {
        version: "the version of komodo software",
        protocolversion: "the protocol version",
        KMDversion: "the version of code running",
        synced: "is this chain synced",
        notarized: "whether the chain is notarized",
        prevMoMheight: "last platform sync for multi-chain environment",
        notarizedhash: "the hash of the last notarization",
        notarizedtxid: "transaction id of the last notarization",
        notarizedtxid_height: "height of last notarization",
        KMDnotarized_height:
          "the KMD main chain height when this chain was notarized",
        notarized_confirms: "confirmed notarizations",
        walletversion: "version of wallet software on this server",
        balance: "balance of this wallet",
        blocks: "how many blocks this server has validated",
        longestchain:
          "the longest chain on the network for this blockchain.  When equal to blocks, in sync.  When different, could be on a fork.",
        timeoffset: "?",
        tiptime: "time of the chain tip",
        connections: "how many other nodes this server is connected to",
        proxy: "?",
        difficulty: "mining/staking difficulty",
        testnet: "whether this is testnet, rarely true",
        keypoololdest: "?",
        keypoolsize: "?",
        paytxfee: "?",
        relayfee: "?",
        errors: "?",
        pubkey:
          "the pubkey used on this server, usually used with Antara or by notary nodes.  Any network rewards will be sent to the address whose pubkey is this",
        CCid:
          "Antara setting for application specific blockchain functions and platform syncing info",
        name: "TICKER of this blockchain",
        sapling: "whether sapling privacy transactions are enabled",
        p2pport: "External p2p port",
        rpcport: "RPC control port",
        magic: "The magic number of this blockchain",
        premine: "How many coins were premined at launch"
      }
    };
  },
  methods: {
    showinfo: function(item) {
      this.sheet = true;
    },
    generate: function(event) {
      // this function is only useful when chain is in regtest mode
      generating
        .generate(rpc, this.slider)
        .then(resp => {
          console.log("Incoming response");
          console.log(resp);
          control
            .getinfo(rpc)
            .then(respgetinfo => {
              this.getinfo = respgetinfo;
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created: function() {
    this.getinfo = "Connecting...";

    control
      .getinfo(rpc)
      .then(resp => {
        console.log("Response");
        console.log(resp);
        if (resp == undefined) console.log("ERROR");
        this.getinfo = resp.result;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
