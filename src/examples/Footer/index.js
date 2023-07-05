// @mui material components
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

function Footer() {
  const { size } = typography;

  return (
    <ArgonBox
      width="100%"
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      justifyContent="space-between"
      alignItems="center"
      px={1.5}
    >
      <ArgonBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        color="text"
        fontSize={size.sm}
        px={1.5}
      >
        &copy; {new Date().getFullYear()}, made with
        <ArgonBox fontSize={size.md} color="text" mb={-0.5} mx={0.25}>
          <Icon color="inherit" fontSize="inherit">
            favorite
          </Icon>
        </ArgonBox>
        by
        <Link href='https://www.3niinfotech.com/' target="_blank">
          <ArgonTypography variant="button" fontWeight="medium">
            &nbsp; 3niinfotech &nbsp;
          </ArgonTypography>
        </Link>
      </ArgonBox>
    </ArgonBox>
  );
}

export default Footer;
