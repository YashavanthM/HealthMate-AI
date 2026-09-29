def parse_systolic_bp(bp_value: str) -> int | None:
    raw_value = str(bp_value).strip()
    if not raw_value:
        return None

    systolic_part = raw_value.split("/", maxsplit=1)[0].strip()
    return int(systolic_part) if systolic_part.isdigit() else None


def clamp(value: int, lower: int, upper: int) -> int:
    return max(lower, min(upper, value))
