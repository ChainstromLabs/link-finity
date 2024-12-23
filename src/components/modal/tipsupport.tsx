import React, { useState } from "react";

import walleticp from '../../assets/linkfintyasset/icpwallet.png';
import walleteth from '../../assets/linkfintyasset/walleteth.png';
import solana from '../../assets/linkfintyasset/solana.png';
import linkfinity from '../../assets/linkfintyasset/logo.png';

interface SupportModalProps {
  isActive: boolean;
  itemName: string;
  onClose: () => void;
  onSubmit: (supportName: string, supportMessage: string, selectedToken: string, donationAmount: number) => void;
}

const tokenData = {
  icp: {
    tokenImages: {
      icp:walleticp,
      ckbtc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDE0NiAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNDYiIGhlaWdodD0iMTQ2IiByeD0iNzMiIGZpbGw9IiMzQjAwQjkiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi4zODM3IDc3LjIwNTJDMTguNDM0IDEwNS4yMDYgNDAuNzk0IDEyNy41NjYgNjguNzk0OSAxMjkuNjE2VjEzNS45MzlDMzcuMzA4NyAxMzMuODY3IDEyLjEzMyAxMDguNjkxIDEwLjA2MDUgNzcuMjA1MkgxNi4zODM3WiIgZmlsbD0idXJsKCNwYWludDBfbGluZWFyXzExMF81NzIpIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNjguNzY0NiAxNi4zNTM0QzQwLjc2MzggMTguNDAzNiAxOC40MDM3IDQwLjc2MzcgMTYuMzUzNSA2OC43NjQ2TDEwLjAzMDMgNjguNzY0NkMxMi4xMDI3IDM3LjI3ODQgMzcuMjc4NSAxMi4xMDI2IDY4Ljc2NDYgMTAuMDMwMkw2OC43NjQ2IDE2LjM1MzRaIiBmaWxsPSIjMjlBQkUyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTI5LjYxNiA2OC43MzQzQzEyNy41NjYgNDAuNzMzNSAxMDUuMjA2IDE4LjM3MzQgNzcuMjA1MSAxNi4zMjMyTDc3LjIwNTEgMTBDMTA4LjY5MSAxMi4wNzI0IDEzMy44NjcgMzcuMjQ4MiAxMzUuOTM5IDY4LjczNDNMMTI5LjYxNiA2OC43MzQzWiIgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzExMF81NzIpIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNzcuMjM1NCAxMjkuNTg2QzEwNS4yMzYgMTI3LjUzNiAxMjcuNTk2IDEwNS4xNzYgMTI5LjY0NyA3Ny4xNzQ5TDEzNS45NyA3Ny4xNzQ5QzEzMy44OTcgMTA4LjY2MSAxMDguNzIyIDEzMy44MzcgNzcuMjM1NCAxMzUuOTA5TDc3LjIzNTQgMTI5LjU4NloiIGZpbGw9IiMyOUFCRTIiLz4KPHBhdGggZD0iTTk5LjgyMTcgNjQuNzI0NUMxMDEuMDE0IDU2Ljc1MzggOTQuOTQ0NyA1Mi40Njg5IDg2LjY0NTUgNDkuNjEwNEw4OS4zMzc2IDM4LjgxM0w4Mi43NjQ1IDM3LjE3NUw4MC4xNDM1IDQ3LjY4NzlDNzguNDE1NSA0Ny4yNTczIDc2LjY0MDYgNDYuODUxMSA3NC44NzcxIDQ2LjQ0ODdMNzcuNTE2OCAzNS44NjY1TDcwLjk0NzQgMzQuMjI4NUw2OC4yNTM0IDQ1LjAyMjJDNjYuODIzIDQ0LjY5NjUgNjUuNDE4OSA0NC4zNzQ2IDY0LjA1NiA0NC4wMzU3TDY0LjA2MzUgNDQuMDAyTDU0Ljk5ODUgNDEuNzM4OEw1My4yNDk5IDQ4Ljc1ODZDNTMuMjQ5OSA0OC43NTg2IDU4LjEyNjkgNDkuODc2MiA1OC4wMjM5IDQ5Ljk0NTRDNjAuNjg2MSA1MC42MSA2MS4xNjcyIDUyLjM3MTUgNjEuMDg2NyA1My43NjhDNTguNjI3IDYzLjYzNDUgNTYuMTcyMSA3My40Nzg4IDUzLjcxMDQgODMuMzQ2N0M1My4zODQ3IDg0LjE1NTQgNTIuNTU5MSA4NS4zNjg0IDUwLjY5ODIgODQuOTA3OUM1MC43NjM3IDg1LjAwMzQgNDUuOTIwNCA4My43MTU1IDQ1LjkyMDQgODMuNzE1NUw0Mi42NTcyIDkxLjIzODlMNTEuMjExMSA5My4zNzFDNTIuODAyNSA5My43Njk3IDU0LjM2MTkgOTQuMTg3MiA1NS44OTcxIDk0LjU4MDNMNTMuMTc2OSAxMDUuNTAxTDU5Ljc0MjYgMTA3LjEzOUw2Mi40MzY2IDk2LjMzNDNDNjQuMjMwMSA5Ni44MjEgNjUuOTcxMiA5Ny4yNzAzIDY3LjY3NDkgOTcuNjkzNEw2NC45OTAyIDEwOC40NDhMNzEuNTYzNCAxMTAuMDg2TDc0LjI4MzYgOTkuMTg1M0M4NS40OTIyIDEwMS4zMDYgOTMuOTIwNyAxMDAuNDUxIDk3LjQ2ODQgOTAuMzE0MUMxMDAuMzI3IDgyLjE1MjQgOTcuMzI2MSA3Ny40NDQ1IDkxLjQyODggNzQuMzc0NUM5NS43MjM2IDczLjM4NDIgOTguOTU4NiA3MC41NTk0IDk5LjgyMTcgNjQuNzI0NVpNODQuODAzMiA4NS43ODIxQzgyLjc3MiA5My45NDM4IDY5LjAyODQgODkuNTMxNiA2NC41NzI3IDg4LjQyNTNMNjguMTgyMiA3My45NTdDNzIuNjM4IDc1LjA2ODkgODYuOTI2MyA3Ny4yNzA0IDg0LjgwMzIgODUuNzgyMVpNODYuODM2NCA2NC42MDY2Qzg0Ljk4MyA3Mi4wMzA3IDczLjU0NDEgNjguMjU4OCA2OS44MzM1IDY3LjMzNEw3My4xMDYgNTQuMjExN0M3Ni44MTY2IDU1LjEzNjQgODguNzY2NiA1Ni44NjIzIDg2LjgzNjQgNjQuNjA2NloiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTEwXzU3MiIgeDE9IjUzLjQ3MzYiIHkxPSIxMjIuNzkiIHgyPSIxNC4wMzYyIiB5Mj0iODkuNTc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjEiIHN0b3AtY29sb3I9IiNFRDFFNzkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTIyNzg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8xMTBfNTcyIiB4MT0iMTIwLjY1IiB5MT0iNTUuNjAyMSIgeDI9IjgxLjIxMyIgeTI9IjIyLjM5MTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwLjIxIiBzdG9wLWNvbG9yPSIjRjE1QTI0Ii8+CjxzdG9wIG9mZnNldD0iMC42ODQxIiBzdG9wLWNvbG9yPSIjRkJCMDNCIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==",
      cketh: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDE0NiAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNDYiIGhlaWdodD0iMTQ2IiByeD0iNzMiIGZpbGw9IiMzQjAwQjkiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi4zODM3IDc3LjIwNTJDMTguNDM0IDEwNS4yMDYgNDAuNzk0IDEyNy41NjYgNjguNzk0OSAxMjkuNjE2VjEzNS45NEMzNy4zMDg3IDEzMy44NjcgMTIuMTMzIDEwOC42OTEgMTAuMDYwNSA3Ny4yMDUySDE2LjM4MzdaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTEwXzU4NikiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02OC43NjQ2IDE2LjM1MzRDNDAuNzYzOCAxOC40MDM2IDE4LjQwMzcgNDAuNzYzNyAxNi4zNTM1IDY4Ljc2NDZMMTAuMDMwMyA2OC43NjQ2QzEyLjEwMjcgMzcuMjc4NCAzNy4yNzg1IDEyLjEwMjYgNjguNzY0NiAxMC4wMzAyTDY4Ljc2NDYgMTYuMzUzNFoiIGZpbGw9IiMyOUFCRTIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMjkuNjE2IDY4LjczNDNDMTI3LjU2NiA0MC43MzM0IDEwNS4yMDYgMTguMzczMyA3Ny4yMDUxIDE2LjMyMzFMNzcuMjA1MSA5Ljk5OTk4QzEwOC42OTEgMTIuMDcyNCAxMzMuODY3IDM3LjI0ODEgMTM1LjkzOSA2OC43MzQzTDEyOS42MTYgNjguNzM0M1oiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8xMTBfNTg2KSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTc3LjIzNTQgMTI5LjU4NkMxMDUuMjM2IDEyNy41MzYgMTI3LjU5NiAxMDUuMTc2IDEyOS42NDcgNzcuMTc0OUwxMzUuOTcgNzcuMTc0OUMxMzMuODk3IDEwOC42NjEgMTA4LjcyMiAxMzMuODM3IDc3LjIzNTQgMTM1LjkwOUw3Ny4yMzU0IDEyOS41ODZaIiBmaWxsPSIjMjlBQkUyIi8+CjxwYXRoIGQ9Ik03My4xOTA0IDMxVjYxLjY4MThMOTkuMTIzIDczLjI2OTZMNzMuMTkwNCAzMVoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNNzMuMTkwNCAzMUw0Ny4yNTQ0IDczLjI2OTZMNzMuMTkwNCA2MS42ODE4VjMxWiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTczLjE5MDQgOTMuMTUyM1YxMTRMOTkuMTQwMyA3OC4wOTg0TDczLjE5MDQgOTMuMTUyM1oiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNNzMuMTkwNCAxMTRWOTMuMTQ4OEw0Ny4yNTQ0IDc4LjA5ODRMNzMuMTkwNCAxMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNzMuMTkwNCA4OC4zMjY5TDk5LjEyMyA3My4yNjk2TDczLjE5MDQgNjEuNjg4N1Y4OC4zMjY5WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4yIi8+CjxwYXRoIGQ9Ik00Ny4yNTQ0IDczLjI2OTZMNzMuMTkwNCA4OC4zMjY5VjYxLjY4ODdMNDcuMjU0NCA3My4yNjk2WiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC42Ii8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTEwXzU4NiIgeDE9IjUzLjQ3MzYiIHkxPSIxMjIuNzkiIHgyPSIxNC4wMzYyIiB5Mj0iODkuNTc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjEiIHN0b3AtY29sb3I9IiNFRDFFNzkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTIyNzg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8xMTBfNTg2IiB4MT0iMTIwLjY1IiB5MT0iNTUuNjAyMSIgeDI9IjgxLjIxMyIgeTI9IjIyLjM5MTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwLjIxIiBzdG9wLWNvbG9yPSIjRjE1QTI0Ii8+CjxzdG9wIG9mZnNldD0iMC42ODQxIiBzdG9wLWNvbG9yPSIjRkJCMDNCIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==",
      ckusdc: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ2IiBoZWlnaHQ9IjE0NiIgdmlld0JveD0iMCAwIDE0NiAxNDYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNDYiIGhlaWdodD0iMTQ2IiByeD0iNzMiIGZpbGw9IiMzQjAwQjkiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNi4zODM3IDc3LjIwNTJDMTguNDM0IDEwNS4yMDYgNDAuNzk0IDEyNy41NjYgNjguNzk0OSAxMjkuNjE2VjEzNS45NEMzNy4zMDg3IDEzMy44NjcgMTIuMTMzIDEwOC42OTEgMTAuMDYwNSA3Ny4yMDUySDE2LjM4MzdaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMTEwXzYwNCkiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02OC43NjQ2IDE2LjM1MzRDNDAuNzYzOCAxOC40MDM2IDE4LjQwMzcgNDAuNzYzNyAxNi4zNTM1IDY4Ljc2NDZMMTAuMDMwMyA2OC43NjQ2QzEyLjEwMjcgMzcuMjc4NCAzNy4yNzg1IDEyLjEwMjYgNjguNzY0NiAxMC4wMzAyTDY4Ljc2NDYgMTYuMzUzNFoiIGZpbGw9IiMyOUFCRTIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMjkuNjE2IDY4LjczNDNDMTI3LjU2NiA0MC43MzM0IDEwNS4yMDYgMTguMzczMyA3Ny4yMDUxIDE2LjMyMzFMNzcuMjA1MSA5Ljk5OTk4QzEwOC42OTEgMTIuMDcyNCAxMzMuODY3IDM3LjI0ODEgMTM1LjkzOSA2OC43MzQzTDEyOS42MTYgNjguNzM0M1oiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl8xMTBfNjA0KSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTc3LjIzNTQgMTI5LjU4NkMxMDUuMjM2IDEyNy41MzYgMTI3LjU5NiAxMDUuMTc2IDEyOS42NDcgNzcuMTc0OUwxMzUuOTcgNzcuMTc0OUMxMzMuODk3IDEwOC42NjEgMTA4LjcyMiAxMzMuODM3IDc3LjIzNTQgMTM1LjkwOUw3Ny4yMzU0IDEyOS41ODZaIiBmaWxsPSIjMjlBQkUyIi8+CjxwYXRoIGQ9Ik04OS4yMjUzIDgyLjMzOTdDODkuMjI1MyA3My43Mzc1IDg0LjA2MjggNzAuNzg3NSA3My43Mzc4IDY5LjU1NDRDNjYuMzYyOCA2OC41NjkxIDY0Ljg4NzggNjYuNjA0NCA2NC44ODc4IDYzLjE2NDdDNjQuODg3OCA1OS43MjUgNjcuMzQ4MSA1Ny41MTI1IDcyLjI2MjggNTcuNTEyNUM3Ni42ODc4IDU3LjUxMjUgNzkuMTQ4MSA1OC45ODc1IDgwLjM3NTMgNjIuNjc1QzgwLjYyMzEgNjMuNDEyNSA4MS4zNjA2IDYzLjkwMjIgODIuMDk4MSA2My45MDIySDg2LjAzMzRDODcuMDE4NyA2My45MDIyIDg3Ljc1NjIgNjMuMTY0NyA4Ny43NTYyIDYyLjE3OTRWNjEuOTMxNkM4Ni43NzA5IDU2LjUyMTMgODIuMzQ1OSA1Mi4zNDQxIDc2LjY5MzcgNTEuODU0NFY0NS45NTQ0Qzc2LjY5MzcgNDQuOTY5MSA3NS45NTYyIDQ0LjIzMTYgNzQuNzI5IDQzLjk4OTdINzEuMDQxNUM3MC4wNTYyIDQzLjk4OTcgNjkuMzE4NyA0NC43MjcyIDY5LjA3NjggNDUuOTU0NFY1MS42MDY2QzYxLjcwMTggNTIuNTkxOSA1Ny4wMjkgNTcuNTA2NiA1Ny4wMjkgNjMuNjU0NEM1Ny4wMjkgNzEuNzY2OSA2MS45NDM3IDc0Ljk2NDcgNzIuMjY4NyA3Ni4xOTE5Qzc5LjE1NCA3Ny40MTkxIDgxLjM2NjUgNzguODk0MSA4MS4zNjY1IDgyLjgyOTRDODEuMzY2NSA4Ni43NjQ3IDc3LjkyNjggODkuNDY2OSA3My4yNTQgODkuNDY2OUM2Ni44NjQzIDg5LjQ2NjkgNjQuNjUxOCA4Ni43NjQ3IDYzLjkxNDMgODMuMDc3MkM2My42NjY1IDgyLjA5MTkgNjIuOTI5IDgxLjYwMjIgNjIuMTkxNSA4MS42MDIySDU4LjAxNDNDNTcuMDI5IDgxLjYwMjIgNTYuMjkxNSA4Mi4zMzk3IDU2LjI5MTUgODMuMzI1VjgzLjU3MjhDNTcuMjc2OCA4OS43MjA2IDYxLjIwNjIgOTQuMTQ1NiA2OS4zMTg3IDk1LjM3MjhWMTAxLjI3M0M2OS4zMTg3IDEwMi4yNTggNzAuMDU2MiAxMDIuOTk2IDcxLjI4MzQgMTAzLjIzN0g3NC45NzA5Qzc1Ljk1NjIgMTAzLjIzNyA3Ni42OTM3IDEwMi41IDc2LjkzNTYgMTAxLjI3M1Y5NS4zNzI4Qzg0LjMwNDcgOTQuMTM5NyA4OS4yMjUzIDg4Ljk3NzIgODkuMjI1MyA4Mi4zMzk3WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTYwLjQ2MjYgMTA4LjE1MkM0MS4yODc2IDEwMS4yNjcgMzEuNDUyMyA3OS44Nzk0IDM4LjU4NTQgNjAuOTUyMkM0Mi4yNzI5IDUwLjYyNzIgNTAuMzg1NCA0Mi43NjI1IDYwLjQ2MjYgMzkuMDc1QzYxLjQ0NzggMzguNTg1MyA2MS45Mzc1IDM3Ljg0NzggNjEuOTM3NSAzNi42MTQ3VjMzLjE3NUM2MS45Mzc1IDMyLjE4OTcgNjEuNDQ3OCAzMS40NTIyIDYwLjQ2MjYgMzEuMjEwM0M2MC4yMTQ4IDMxLjIxMDMgNTkuNzI1MSAzMS4yMTAzIDU5LjQ3NzMgMzEuNDU4MUMzNi4xMjUxIDM4LjgzMzEgMjMuMzM5OCA2My42NjAzIDMwLjcxNDggODcuMDE4NEMzNS4xMzk4IDEwMC43ODMgNDUuNzEyNiAxMTEuMzU2IDU5LjQ3NzMgMTE1Ljc4MUM2MC40NjI2IDExNi4yNzEgNjEuNDQyIDExNS43ODEgNjEuNjg5OCAxMTQuNzk2QzYxLjkzNzYgMTE0LjU0OCA2MS45Mzc1IDExNC4zMDYgNjEuOTM3NSAxMTMuODFWMTEwLjM3MUM2MS45Mzc1IDEwOS42MjcgNjEuMjAwMSAxMDguNjQ4IDYwLjQ2MjYgMTA4LjE1MlpNODYuNTE2OSAzMS40NTIyQzg1LjUzMTYgMzAuOTYyNSA4NC41NTIyIDMxLjQ1MjIgODQuMzA0NCAzMi40Mzc1Qzg0LjA1NjYgMzIuNjg1MyA4NC4wNTY2IDMyLjkyNzIgODQuMDU2NiAzMy40MjI4VjM2Ljg2MjVDODQuMDU2NiAzNy44NDc4IDg0Ljc5NDIgMzguODI3MiA4NS41MzE3IDM5LjMyMjhDMTA0LjcwNyA0Ni4yMDgxIDExNC41NDIgNjcuNTk1NiAxMDcuNDA5IDg2LjUyMjhDMTAzLjcyMSA5Ni44NDc4IDk1LjYwODggMTA0LjcxMyA4NS41MzE3IDEwOC40Qzg0LjU0NjMgMTA4Ljg5IDg0LjA1NjYgMTA5LjYyNyA4NC4wNTY2IDExMC44NlYxMTQuM0M4NC4wNTY2IDExNS4yODUgODQuNTQ2MyAxMTYuMDIzIDg1LjUzMTcgMTE2LjI2NUM4NS43Nzk0IDExNi4yNjUgODYuMjY5MSAxMTYuMjY1IDg2LjUxNjkgMTE2LjAxN0MxMDkuODY5IDEwOC42NDIgMTIyLjY1NCA4My44MTQ3IDExNS4yNzkgNjAuNDU2NkMxMTAuODU0IDQ2LjQ1IDEwMC4wNCAzNS44NzcyIDg2LjUxNjkgMzEuNDUyMloiIGZpbGw9IndoaXRlIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMTEwXzYwNCIgeDE9IjUzLjQ3MzYiIHkxPSIxMjIuNzkiIHgyPSIxNC4wMzYyIiB5Mj0iODkuNTc4NiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjEiIHN0b3AtY29sb3I9IiNFRDFFNzkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTIyNzg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl8xMTBfNjA0IiB4MT0iMTIwLjY1IiB5MT0iNTUuNjAyMSIgeDI9IjgxLjIxMyIgeTI9IjIyLjM5MTQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwLjIxIiBzdG9wLWNvbG9yPSIjRjE1QTI0Ii8+CjxzdG9wIG9mZnNldD0iMC42ODQxIiBzdG9wLWNvbG9yPSIjRkJCMDNCIi8+CjwvbGluZWFyR3JhZGllbnQ+CjwvZGVmcz4KPC9zdmc+Cg==",
      ckusdt: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYwIiBoZWlnaHQ9IjM2MCIgdmlld0JveD0iMCAwIDM2MCAzNjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF84NzZfNzEpIj4KPHBhdGggZD0iTTE4MCAwQzI3OS40IDAgMzYwIDgwLjYgMzYwIDE4MEMzNjAgMjc5LjQgMjc5LjQgMzYwIDE4MCAzNjBDODAuNiAzNjAgMCAyNzkuNCAwIDE4MEMwIDgwLjYgODAuNiAwIDE4MCAwWiIgZmlsbD0iIzNCMDBCOSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTQwLjQwMDEgMTkwLjQwMkM0NS40MDAxIDI1OS40MDIgMTAwLjYgMzE0LjYwMiAxNjkuNiAzMTkuNjAyVjMzNS4yMDJDOTIuMDAwMSAzMzAuMDAyIDMwIDI2OC4wMDIgMjQuOCAxOTAuNDAySDQwLjQwMDFaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfODc2XzcxKSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE2OS42IDQwLjQwMDhDMTAwLjYgNDUuNDAwOCA0NS40MDAxIDEwMC42MDEgNDAuNDAwMSAxNjkuNjAxSDI0LjhDMjkuOCA5Mi4wMDA4IDkyLjAwMDEgMjkuODAwOCAxNjkuNiAyNC44MDA4VjQwLjQwMDhaIiBmaWxsPSIjMjlBQkUyIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzE5LjYgMTY5LjQwMkMzMTQuNiAxMDAuNDAyIDI1OS40IDQ1LjIwMTYgMTkwLjQgNDAuMjAxNlYyNC42MDE2QzI2OCAyOS44MDE2IDMzMC4yIDkxLjgwMTYgMzM1LjIgMTY5LjQwMkgzMTkuNloiIGZpbGw9InVybCgjcGFpbnQxX2xpbmVhcl84NzZfNzEpIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMTkwLjQgMzE5LjYwMkMyNTkuNCAzMTQuNjAyIDMxNC42IDI1OS40MDIgMzE5LjYgMTkwLjQwMkgzMzUuMkMzMzAuMiAyNjguMDAyIDI2OCAzMzAuMDAyIDE5MC40IDMzNS4yMDJWMzE5LjYwMloiIGZpbGw9IiMyOUFCRTIiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xOTUuODAxIDE4NS40MDdDMTk0LjkxNCAxODUuNDc0IDE5MC4zMzQgMTg1Ljc0OCAxODAuMTE5IDE4NS43NDhDMTcxLjk5MyAxODUuNzQ4IDE2Ni4yMjQgMTg1LjUwNCAxNjQuMiAxODUuNDA3QzEzMi43OTkgMTg0LjAyMyAxMDkuMzYxIDE3OC41NDUgMTA5LjM2MSAxNzEuOTg3QzEwOS4zNjEgMTY1LjQyOCAxMzIuNzk5IDE1OS45NTggMTY0LjIgMTU4LjU1MVYxNzkuOTUyQzE2Ni4yNTQgMTgwLjEgMTcyLjEzMyAxODAuNDQ4IDE4MC4yNTkgMTgwLjQ0OEMxOTAuMDA5IDE4MC40NDggMTk0Ljg5MiAxODAuMDQxIDE5NS43NzEgMTc5Ljk1OVYxNTguNTY2QzIyNy4xMDUgMTU5Ljk2NSAyNTAuNDkyIDE2NS40NDMgMjUwLjQ5MiAxNzEuOTg3QzI1MC40OTIgMTc4LjUzMSAyMjcuMTEzIDE4NC4wMDggMTk1Ljc3MSAxODUuNEwxOTUuODAxIDE4NS40MDdaTTE5NS44MDEgMTU2LjM1M1YxMzcuMjAzSDIzOS41M1YxMDhIMTIwLjQ3MVYxMzcuMjAzSDE2NC4xOTNWMTU2LjM0NUMxMjguNjU1IDE1Ny45ODEgMTAxLjkzIDE2NS4wMzYgMTAxLjkzIDE3My40OUMxMDEuOTMgMTgxLjk0MyAxMjguNjU1IDE4OC45OSAxNjQuMTkzIDE5MC42MzRWMjUySDE5NS43OTNWMTkwLjYxMUMyMzEuMjQ5IDE4OC45NzUgMjU3LjkzIDE4MS45MjggMjU3LjkzIDE3My40ODJDMjU3LjkzIDE2NS4wMzYgMjMxLjI3MiAxNTcuOTg5IDE5NS43OTMgMTU2LjM0NUwxOTUuODAxIDE1Ni4zNTNaIiBmaWxsPSJ3aGl0ZSIvPgo8L2c+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfODc2XzcxIiB4MT0iMTMwLjcyIiB5MT0iMzA0LjEyMiIgeDI9IjMzLjQ4IiB5Mj0iMjIyLjIyMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjEiIHN0b3AtY29sb3I9IiNFRDFFNzkiLz4KPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTIyNzg1Ii8+CjwvbGluZWFyR3JhZGllbnQ+CjxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQxX2xpbmVhcl84NzZfNzEiIHgxPSIzMDkuMzIiIHkxPSIxMjMuMDYyIiB4Mj0iMjEyLjA4IiB5Mj0iNDEuMTYxNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMjEiIHN0b3AtY29sb3I9IiNGMTVBMjQiLz4KPHN0b3Agb2Zmc2V0PSIwLjY4IiBzdG9wLWNvbG9yPSIjRkJCMDNCIi8+CjwvbGluZWFyR3JhZGllbnQ+CjxjbGlwUGF0aCBpZD0iY2xpcDBfODc2XzcxIj4KPHJlY3Qgd2lkdGg9IjM2MCIgaGVpZ2h0PSIzNjAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",
   
    },
    tokenBalances: {
      icp: 0,
      ckbtc: 0,
      cketh: 0,
      ckusdc: 10,
      ckusdt: 0,
    },
    tokenNames: ["icp","ckbtc", "cketh", "ckusdc", "ckusdt"],
  },
  evm: {
    tokenImages: {
      eth: walleteth,
    },
    tokenBalances: {
      eth: 0,
    },
    tokenNames: ["eth"],
  },
  sol: {
    tokenImages: {
      SOLANA: solana,
    },
    tokenBalances: {
      SOLANA: 400,
    },
    tokenNames: ["SOLANA"],
  },
};


const SupportModal: React.FC<SupportModalProps> = ({ isActive, itemName, onClose, onSubmit }) => {
  const [supportName, setSupportName] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [selectedToken, setSelectedToken] = useState<string>("");
  const [donationAmount, setDonationAmount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const [chainType, setChainType] = useState<"icp" | "evm" | "sol">("icp");
  const [isAnonymous, setIsAnonymous] = useState(false);

  type TokenImages1 = { ckbtc: string; cketh: string; ckusdc: string };
  type TokenImages2 = { eth: string;};
  type TokenImages3 = { SOLANA: string;};

  const getTokenImage = (token: string): string | undefined => {
    const tokenImages = tokenData[chainType]?.tokenImages;

    if (tokenImages) {
      if ('ckbtc' in tokenImages) {
        return tokenImages[token as keyof TokenImages1];
      } else if ('eth' in tokenImages) {
        return tokenImages[token as keyof TokenImages2];
      } else if ('SOLANA' in tokenImages) {
        return tokenImages[token as keyof TokenImages3];
      }
    }

    return undefined;
  };

  const getTokenBalance = (token: string): number | undefined => {
    const tokenBalances = tokenData[chainType]?.tokenBalances;

    if (tokenBalances && tokenBalances.hasOwnProperty(token)) {
      return tokenBalances[token as keyof typeof tokenBalances];
    }

    return undefined;
  };

  const handleSelect = (token: string) => {
    setSelectedToken(token);
    setIsOpen(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  return (
    isActive && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h3 className="text-xl font-bold mb-4">Support {itemName}</h3>

          <div className="space-y-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            {/* Name Field */}
            <div className="mb-4 relative">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded p-2 pr-10"
                placeholder="Enter your name"
                value={supportName}
                onChange={(e) => setSupportName(e.target.value)}
                disabled={isAnonymous}
              />
              <button
                type="button"
                onClick={() => {
                  if (isAnonymous) {
                    setSupportName("");
                    setIsAnonymous(false);
                  } else {
                    setSupportName("Anonymous");
                    setIsAnonymous(true);
                  }
                }}
                className="absolute top-12 right-2 transform -translate-y-1/2 flex items-center justify-center w-10 h-10 text-gray-400 hover:text-gray-600"
                title="Set as Anonymous"
              >
                <i className="fas fa-user-secret"></i>
              </button>
            </div>

            {/* Support Message Field */}
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Support Message</label>
              <textarea
                id="message"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter your message of support..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
              />
            </div>


            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="token" className="text-xs font-semibold text-white bg-indigo-500 px-2 py-1 rounded-md mr-2">
                  Balance: {getTokenBalance(selectedToken) ?? 0} {selectedToken.toUpperCase()}
                </label>
                <label htmlFor="chain-type" onClick={() => setShowPopup(true)} className="cursor-pointer text-xs font-semibold text-white bg-indigo-500 px-2 py-1 rounded-md">
                  Your Chain: {chainType.toUpperCase()}
                </label>
              </div>

              <div className="relative">
                <div
                  className="cursor-pointer w-full border border-gray-300 rounded p-2 pl-2 flex items-center justify-between"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="flex items-center">
                    <img src={getTokenImage(selectedToken) ?? linkfinity} alt="Token Icon" className="w-6 h-6 mr-2" />
                    <span>
                      {selectedToken ? selectedToken : "Please select token"} {chainType.toUpperCase() === "EVM" && "(Arbitrum)"}
                    </span>

                  </div>

                  <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
                </div>

                {isOpen && (
                  <div className="absolute w-full bg-white border border-gray-300 rounded mt-2 z-10">
                    {tokenData[chainType]?.tokenNames.map((token) => (
                      <div
                        key={token}
                        className="cursor-pointer flex items-center p-2 hover:bg-gray-100"
                        onClick={() => handleSelect(token)}
                      >
                        <img src={getTokenImage(token) ?? linkfinity} alt={`${token} Icon`} className="w-6 h-6 mr-2" />
                        {token}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Token Amount Field */}
            <div className="mb-4">
              <label htmlFor="donationAmount" className="block text-sm font-semibold text-gray-700 mb-2">Amount (Token)</label>
              <input
                id="donationAmount"
                type="number"
                step="0.001"
                min="0.001"
                className="w-full border border-gray-300 rounded p-2"
                placeholder="Enter the amount of tokens"
                value={donationAmount}
                onChange={(e) => setDonationAmount(Number(e.target.value))}
              />
            </div>

          </div>

          <div className="flex justify-end mt-4">
            <button
              className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={onClose}
            >
               <i className="fas fa-times mr-2"></i> Cancel
            </button>
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              onClick={() => onSubmit(supportName, supportMessage, selectedToken, donationAmount)}
            >
               <i className="fas fa-paper-plane mr-2"></i> Send Support
            </button>
          </div>
        </div>


        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

            <div className="bg-white rounded-lg shadow-lg p-6 w-80 space-y-4">

              <h2 className="text-lg font-semibold text-center mb-2">Select Chain</h2>

              <button
                onClick={() => (setChainType("icp"), setShowPopup(false))}
                className="relative flex items-center w-full bg-gray-900 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
              >

                <img
                  src={walleticp}
                  alt="Solana Wallet"
                  className="absolute left-4 w-8 h-8 rounded-full"
                />

                <span className="w-full text-center">ICP</span>
              </button>

              <button
                onClick={() => (setChainType("sol"), setSelectedToken(""), setShowPopup(false))}

                className="relative flex items-center w-full bg-gray-900 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
              >
                <img
                  src={solana}
                  alt="Solana Wallet"
                  className="absolute left-4 w-8 h-8 rounded-full"
                />

                <span className="w-full text-center">SOL</span>
              </button>


              <button
                onClick={() => (setChainType("evm"), setSelectedToken(""), setShowPopup(false))}

                className="relative flex items-center w-full bg-gray-900 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition-all duration-300"
              >
                <img
                  src={walleteth}
                  alt="Solana Wallet"
                  className="absolute left-4 w-8 h-8 rounded-full"
                />

                <span className="w-full text-center">EVM</span>
              </button>



              <button
                onClick={() => setShowPopup(false)}
                className="w-full flex justify-center items-center bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-md transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    )
  );
};

export default SupportModal;
