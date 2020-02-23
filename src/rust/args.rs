use clap::Clap;

#[derive(Clap, Debug)]
pub struct Args {

    /// Which address to listen on.
    #[clap(default_value = "0.0.0.0", long = "address", short = "a")]
    pub address: String,

    /// The directory to store visualization files and rendered material in, by default elmyra's runtime directory (= the one where the executable and bundled resources are located) is used.
    #[clap(long = "data-dir")]
    pub data_dir: Option<String>,

    /// By default elmyra runs a renderer process in the background, this option disables it.
    #[clap(long = "disable-rendering")]
    pub disable_rendering: bool,

    /// Which port to listen on.
    #[clap(default_value = "8080", short = "p", long = "port")]
    pub port: u16

}
